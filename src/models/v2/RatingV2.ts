// src/models/Season.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IRating extends Document {
  userId: Types.ObjectId;         
  target: 'movie' | 'episode';    
  targetId: Types.ObjectId;
  score : number;
  review : string;
}

const RatingSchema = new Schema<IRating>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    target: { type: String, enum: ['movie', 'episode'], required: true },
    targetId: { type: Schema.Types.ObjectId,  required: true },
    score:  {type : Number, required: true},
    review: {type : String, required: true}

  },
  { timestamps: true }
);

export default model<IRating>('Rating', RatingSchema);
