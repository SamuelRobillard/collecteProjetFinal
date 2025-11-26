import { Schema, model, Document, Types } from 'mongoose';

export interface IBooking extends Document {
  hotelId: string;
  userId: Types.ObjectId;
  dateStart: string;
  dateEnd: string;
  nbRooms: number;
}

const BookingSchema = new Schema<IBooking> ({
    hotelId: { type: String, ref: 'Hotel', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dateStart: { type: String, required: true },
    dateEnd: { type: String, required: true },
    nbRooms: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model<IBooking>('Booking', BookingSchema);
