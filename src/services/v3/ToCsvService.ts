import { DataTransferService } from "./DataTransferService";
import { HotelService } from "./HotelService";
import * as fastcsv from "fast-csv";
import * as fs from "fs";
import Booking from "../../models/v3/BookingModel";

export class ToCsvService {
    public static async createHotelCsv(): Promise<any[]> {
        const allId = await HotelService.getAllHotelId();

        if (!allId || allId.length === 0) {
            console.warn("No hotel IDs found");
            return [];
        }

        const rawData = await Promise.all(
            allId.map((id) => DataTransferService.combineAllDataForOneHotelById(id))
        );

        const validData = rawData.filter(
            (item): item is NonNullable<typeof item> => item !== null && item !== undefined
        );

        if (validData.length === 0) {
            console.warn("No complete hotel data available after filtering");
        }

        return validData;
    }

    public static async createBookingCsv(): Promise<any[]> {
        const bookings = await Booking.find({}).lean().exec();

        if (!bookings || bookings.length === 0) {
            return [];
        }

        return bookings.map((b) => ({
            bookingId: b._id.toString(),
            userId: b.userId.toString(),
            hotelId: b.hotelId,
            dateStart: b.dateStart,
            dateEnd: b.dateEnd,
            nbRooms: b.nbRooms,
        }));
    }

    public static async createHotelsCsvFile(): Promise<void> {
        const data = await this.createHotelCsv();
        const filePath = "hotels.csv";
        const ws = fs.createWriteStream(filePath);

        fastcsv
            .write(data, { headers: true })
            .pipe(ws)
            .on("finish", () => console.log(`Hotels CSV saved: ${filePath}`))
            .on("error", (err) => console.error("Error writing hotels CSV:", err));
    }

    public static async createBookingsCsvFile(): Promise<void> {
        const data = await this.createBookingCsv();
        const filePath = "bookings.csv";
        const ws = fs.createWriteStream(filePath);

        fastcsv
            .write(data, {
                headers: ["bookingId", "userId", "hotelId", "dateStart", "dateEnd", "nbRooms"],
            })
            .pipe(ws)
            .on("finish", () => console.log(`Bookings CSV saved: ${filePath}`))
            .on("error", (err) => console.error("Error writing bookings CSV:", err));
    }
}