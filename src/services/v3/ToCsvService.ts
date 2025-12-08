import DataTransferHotelInfo from "../../models/v3/DataTransferHotelInfo";
import { DataTransferService } from "./DataTransferService";
import { HotelService } from "./HotelService";
import * as fastcsv from "fast-csv";
import * as fs from "fs";

export class ToCsvService {
    public static async createHotelCsv(): Promise<any> {

        const allId = await HotelService.getAllHotelId();

        if (allId === null)
            throw new Error("Nothing found");

        const result = await Promise.all(allId.map(async e => await DataTransferService.combineAllDataForOneHotelById(e)));

        return result
    }

    public static async createCsv(): Promise<any>  {
        const dataTransferHotelInfo = await this.createHotelCsv();
        const filePath = "hotels.csv";
        const ws = fs.createWriteStream(filePath);
        
        fastcsv.write(dataTransferHotelInfo, { headers: true })
            .pipe(ws)
            .on('finish', () => {
                console.log(`CSV file has been saved to ${filePath} using fast-csv.`);
            })
            .on('error', (err) => {
                console.error('Error writing to CSV file with fast-csv', err);
            });
    }
}