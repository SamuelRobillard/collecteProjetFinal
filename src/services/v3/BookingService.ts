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
    const totalDay = this.calculateDaysBetweenDates(dateStart, dateEnd);
    
    const booking = new Booking({
      hotelId,
      userId,
      dateStart,
      dateEnd,
      nbRooms,
      totalDay
    });

    try {
      const alreadyExist = await Booking.findOne({
        hotelId: hotelId,
        userId: userId,
      });

      if (alreadyExist != null) {
        return { message: `Booking already exists for this user in this hotel.` };
      } else {
        await booking.save();
        
        
      
        
        
        return { booking: booking };
      }
    } catch (error) {
      throw new Error("Error while creating booking: " + error);
    }
  }

  public static async getBookingsByUserId(userId: string): Promise<IBooking[] | null> {
    try {
      const bookings = await Booking.find({ userId: userId });
      if (bookings != null) {
        return bookings;
      }

      return null;
    } catch (error) {
      throw new Error("Error fetching bookings by user ID: " + error);
    }
  }

  public static async getBookingsIdByUserId(userId: string): Promise<string[] | null> {
    try {
            const hotels = await  Booking.find({ userId: userId }).select("hotelId");
            if(hotels != null){
                return hotels.map(e => e.hotelId); 
            }
    
            return null
          
          
        } catch (error) {
          throw new Error('Erreur lors de la récupération des cityCodeName: ' + error);
        }
      }
  

  public static async deleteBookingByHotelId(hotelId: string) {
    try {
      const alreadyExist = await Booking.findOne({ hotelId: hotelId });

      if (alreadyExist != null) {
        const booking = await Booking.findOneAndDelete({ hotelId: hotelId });
        return booking;
      }
    } catch (error) {
      throw new Error("Unable to delete booking for this hotel: " + error);
    }
  }


  public static calculateDaysBetweenDates(dateStart: string, dateEnd: string): number {
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);

    // Calculer la différence en millisecondes
    const timeDiff = endDate.getTime() - startDate.getTime();

    // Convertir les millisecondes en jours
    const days = timeDiff / (1000 * 3600 * 24); // 1000 ms * 3600 s * 24 h

    return days;
  }
}
