// src/models/Season.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface ISeason extends Document {
  seasonNo: number;          // numéro de la saison
  episodes: number;        // nombre d'épisodes
  serieId: Types.ObjectId;   // référence vers la série
}

const SeasonSchema = new Schema<ISeason>(
  {
    seasonNo: { type: Number, required: true },
    episodes: { type: Number, required: true, min: 1 },
    serieId: { type: Schema.Types.ObjectId, ref: 'Serie', required: true },
  },
  { timestamps: true }
);

export default model<ISeason>('Season', SeasonSchema);
