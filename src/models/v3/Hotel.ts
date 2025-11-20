// src/models/Season.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IHotel extends Document {
  hotelId: string;          // numéro de la saison
  name: string;        // nombre d'épisodes
    // référence vers la série
}

const HotelSchema = new Schema<IHotel>(
  {
    hotelId: { type: String, required: true },
    name: { type: String, required: true },
   
  },
  { timestamps: true }
);

export default model<IHotel>('Hotel', HotelSchema);
