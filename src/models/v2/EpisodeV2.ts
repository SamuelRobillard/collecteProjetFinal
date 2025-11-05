// src/models/Season.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IEpisode extends Document {
  seasonId: Types.ObjectId;         // numéro de la saison
  epNo: number;        // nombre d'épisodes
  serieId: Types.ObjectId;   // référence vers la série
  title : string;
  durationMin : number;
}

const EpisodeSchema = new Schema<IEpisode>(
  {
    seasonId: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    epNo: { type: Number, required: true, min: 1},
    serieId: { type: Schema.Types.ObjectId, ref: 'Serie', required: true },
    title: { type: String, required: true },
    durationMin: { type: Number, required: true, min: 1, max: 300 },
  },
  { timestamps: true }
);

export default model<IEpisode>('Episode', EpisodeSchema);
