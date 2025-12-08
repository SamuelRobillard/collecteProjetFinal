import { Types } from "mongoose";
import { HttpError } from "../../utils/HttpError";
import Booking, { IBooking } from "../../models/v3/BookingModel";

export class BookingService {
  public static async createBooking(
    hotelId: string,
    userId: string,
    dateStart: string,
    dateEnd: string,
    nbRooms: number
  ): Promise<any> {
    const booking = new Booking({
      hotelId,
      userId,
      dateStart,
      dateEnd,
      nbRooms,
    });

    try {
      const AlreadyExist = await Booking.findOne({
        hotelId: hotelId,
        userId: userId,
      });

      if (AlreadyExist != null) {
        return { message: `code :  ${booking} already exists` };
      } else {
        await booking.save();
        return { booking: booking };
      }
    } catch (error) {
      throw new Error("Erreur lors de la récupération des booking: " + error);
    }
  }

  public static async getBookingsByUserId(userId: string): Promise<IBooking[] | null> {
    try {
      const booking = await Booking.find({ userId: userId });
      if (booking != null) {
        return booking;
      }

      return null;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des cityCodeName: " + error
      );
    }
  }


  public static async deleteBookingByHotelId(hotelId:string){

    try {
      const AlreadyExist =  await Booking.findOne({hotelId:hotelId});

      if(AlreadyExist != null){
        const booking =  await Booking.findOneAndDelete({hotelId:hotelId})
        return booking;
      }
    } catch (error) {
       throw new  Error("Impossible  de supprimer le booking de cet hôtel." + error );
    }


  }
}
