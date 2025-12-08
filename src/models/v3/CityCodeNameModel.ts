import { Schema, model, Document, Types } from 'mongoose';

export interface ICityCodeName extends Document {
  cityCode: string,
  cityName: string,   
}

const CityCodeName = new Schema<ICityCodeName> ({
    cityCode: { type: String, required: true },
    cityName: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<ICityCodeName>('CityCodeName', CityCodeName);
