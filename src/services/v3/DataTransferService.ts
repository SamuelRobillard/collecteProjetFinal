import { compareSync } from "bcryptjs";
import api from "../../utils/v3/axiosClient";
import { HotelService } from "./HotelService";
import DataTransferHotelInfo from "../../models/v3/DataTransferHotelInfo";
import { HotelLocationService } from "./HotelLocationService";
import { HotelQualityService } from "./HotelQualityService";
import DTOBooking from "../../models/v3/DTOBookingHotel";
import { BookingService } from "./BookingService";
import BookingModel from "../../models/v3/BookingModel";


export class DataTransferService {









    public static async combineAllDataForOneHotelById(hotelId: string): Promise<DataTransferHotelInfo | null> {
        try {

            const hotelName = await HotelService.getHotelById(hotelId)
            const hotelLocation = await HotelLocationService.getHotelLocationById(hotelId)
            const hotelQuality = await HotelQualityService.getHotelQualityById(hotelId)

            if (hotelName && hotelQuality && hotelLocation) {
                const dataTransferHotelInfo = new DataTransferHotelInfo(hotelId, hotelName.name, hotelLocation.countryCode, hotelLocation.cityCode, hotelQuality.rating, hotelQuality.nbRating, hotelQuality.price, hotelQuality.ratioPriceQuality)
                return dataTransferHotelInfo
            }
            else {
                return null
            }

        }


        catch {
            return null
        }
    }




    public static async combineAllDataForOneHotelForBookingById(userId: string): Promise<DTOBooking []| null> {
        try {
            const hotelBookingId = await BookingService.getBookingsIdByUserId(userId)
            console.log("hotelId ",  hotelBookingId)
            if (hotelBookingId !== null) {
                console.log(hotelBookingId)

                let DTOBookingList : DTOBooking[] = []

                for (const hotelId of hotelBookingId) {
                    console.log(hotelId)


                    const hotelBooking = await BookingModel.findOne({
                        hotelId: hotelId,
                        userId: userId,
                    });
                    
                    const hotelName = await HotelService.getHotelById(hotelBooking?.hotelId as string)
                    const hotelLocation = await HotelLocationService.getHotelLocationById(hotelBooking?.hotelId as string)
                    const hotelQuality = await HotelQualityService.getHotelQualityById(hotelBooking?.hotelId as string)

                    

                    if (hotelName && hotelBooking && hotelLocation && hotelQuality) {
                        if (hotelBooking?.totalDay !== undefined && hotelQuality?.price !== undefined) {
                            const price = hotelQuality.price * hotelBooking.totalDay * hotelBooking.nbRooms
                            const dataTransferHotelInfo = new DTOBooking(hotelBooking.hotelId, hotelName.name, hotelLocation.countryCode, hotelLocation.cityCode,
                                hotelBooking.dateStart, hotelBooking.dateEnd, price)
                            DTOBookingList.push(dataTransferHotelInfo)
                            
                        }
                    }
                };


                console.log(DTOBookingList)
                return DTOBookingList


            }





            return null
        }


        catch {
            return null
        }
    }
}