import { Types } from "mongoose";
import SeasonsV2, { ISeason } from "../../models/v2/SeasonsV2";
import SerieV2 from "../../models/v2/SerieV2";






export class SeasonServiceV2 {


  
  public static async createSeason(seasonNo: number, episodes: number, serieId : string): Promise<any> {
   
    const serieExists = await SerieV2.findById(serieId);
    if (!serieExists) {
      throw new Error('La série n’existe pas');
    }
    else{
       // Créer un nouvel utilisateur
    const season = new SeasonsV2({
       seasonNo,
       episodes,
       serieId,
     
    });

    // Sauvegarder l'utilisateur dans la base de données
    await season.save();

    // Retourner l'utilisateur créé
    return season;
  }
    }
   



  public static async getAllseason(): Promise<ISeason[]> {
    try {
      const seasons = await SeasonsV2.find();
      
      return seasons;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des seasons: ' + error);
    }
  }

  static async getSeasonsBySerie(serieId: string): Promise<ISeason[]> {
    if (!Types.ObjectId.isValid(serieId)) throw new Error('ID de série invalide');

    return await SeasonsV2.find({ serie: serieId });
  }

  

 
}