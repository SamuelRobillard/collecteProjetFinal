// src/models/Season.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IHotelLocation extends Document {
  hotelId: Types.ObjectId;          
  cityCode: string; 
  countryCode : string;       
  latitude: number;  
  longitude : number;
}

const HotelLocationSchema = new Schema<IHotelLocation>(
  {
    hotelId: { type: Schema.Types.ObjectId,  ref: 'Hotel',  required: true },
    cityCode: { type: String, required: true },
    countryCode:  { type: String, required: true },
    latitude :  { type: Number, required: true },
    longitude :  { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<IHotelLocation>('HotelLocation', HotelLocationSchema);
