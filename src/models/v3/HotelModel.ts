// src/models/Season.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IHotel extends Document {
  hotelId: string;
  name: string;
}

const HotelSchema = new Schema<IHotel> ({
    hotelId: { type: String, required: true },
    name: { type: String, required: true },
   
  },
  { timestamps: true }
);

export default model<IHotel>('Hotel', HotelSchema);
