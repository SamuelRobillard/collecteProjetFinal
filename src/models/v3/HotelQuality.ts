// src/models/Season.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IHotelQuality extends Document {
  hotelId: string;         // numéro de la saison
  price : number,
  rating : number,
  ratioPriceQuality : number,
    // référence vers la série
}

const HotelSchema = new Schema<IHotelQuality>(
  {
    hotelId: { type: String,  ref: 'Hotel',  required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    ratioPriceQuality: { type: Number, required: true },
    
   
  },
  { timestamps: true }
);

export default model<IHotelQuality>('HotelQuality', HotelSchema);
