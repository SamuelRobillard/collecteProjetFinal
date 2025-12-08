import { Request, Response } from "express";
import { BookingService } from "../../services/v3/BookingService";
import { homedir } from "os";

export class BookingController {
  public async createBooking(req: Request, res: Response): Promise<Response> {
    const { hotelId, userId, dateStart, dateEnd, nbRooms } = req.body;
    console.log(hotelId, userId, dateStart, dateEnd, nbRooms)
    try {
      const booking = await BookingService.createBooking(
        hotelId,
        userId,
        dateStart,
        dateEnd,
        nbRooms
      );
      return res.status(201).json(booking);
    } catch (error: unknown) {
      return res.status(400).json({ message: "probleme creation de booking" });
    }
  }

  public async getBookingsByUserId(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { userId } = req.query; // Les paramètres sont dans req.query

    try {
      // Si l'utilisateur a filtré par cityName, on retourne le cityCode
      const code = await BookingService.getBookingsByUserId(userId as string);
      if (code) {
        return res.status(200).json({ cityCode: code });
      } else {
        return res
          .status(404)
          .json({ message: `Aucun booking trouvé pour le user ${userId}` });
      }
    } catch (error: unknown) {
      // Gestion des erreurs
      return res.status(500).json({
        message: "Erreur interne du serveur",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      });
    }
  }


  public async deleteBookingByHotelId(req:Request,res:Response):Promise<void>{
    const {hotelId} = req.query;

    try {     
        if(hotelId != undefined)
        await BookingService.deleteBookingByHotelId(hotelId as string)
        res.status(204).send(); 
       }
     catch (error:unknown) {
       res.status(404).json({
        message: "L'id de l'hôtel n'existe pas",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      });
    }
    
    }
}

