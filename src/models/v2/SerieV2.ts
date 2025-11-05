// src/models/Movie.ts
import { Schema, model, Document } from 'mongoose';

export interface ISerie extends Document {
  title: string;
  genre: string[];
  status : string;
  
}

const SerieSchema = new Schema<ISerie>(
  {
    title: { type: String, required: true },
    genre: [{ type: String }],
    status: { type: String, enum: ['ongoing', 'ended'] },
    
  },
  { timestamps: true }
);

export default model<ISerie>('Serie', SerieSchema);
