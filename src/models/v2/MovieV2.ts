// src/models/Movie.ts
import { Schema, model, Document } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  genre: string[];
  releaseDate?: Date;
  durationMin: number;   // durée en minutes
  synopsis?: string;
}

const MovieSchema = new Schema<IMovie>(
  {
    title: { type: String, required: true },
    genre: [{ type: String }], 
    releaseDate: { type: Date, },
    durationMin: { type: Number, required: true },
    synopsis: { type: String },
  },
  { timestamps: true }
);

export default model<IMovie>('Movie', MovieSchema);
