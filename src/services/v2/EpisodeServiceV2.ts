import { Types } from "mongoose";
import SeasonsV2, { ISeason } from "../../models/v2/SeasonsV2";
import SerieV2 from "../../models/v2/SerieV2";
import EpisodeV2, { IEpisode } from "../../models/v2/EpisodeV2";






export class EpisodeServiceV2 {


  
  public static async createEpisode(seasonId: string, epNo: number, serieId : string, title : string, durationMin : number): Promise<any> {
   
      const serieExists = await SerieV2.findById(serieId);
      const seasonExist = await SeasonsV2.findById(seasonId);
      
    if (!serieExists) {
      throw new Error('La série n’existe pas');
    }
    else if (!seasonExist){
         throw new Error('La saison n’existe pas');
    }
    
    else{
       // Créer un nouvel utilisateur
    const episode = new EpisodeV2({
       seasonId,
       epNo,
       serieId,
       title,
       durationMin,
     
    });

    // Sauvegarder l'utilisateur dans la base de données
    await episode.save();

    // Retourner l'utilisateur créé
    return episode;
  }
    }
   



  public static async getAllEpisode(): Promise<IEpisode[]> {
    try {
      const episodes = await EpisodeV2.find();
      
      return episodes;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des episodes: ' + error);
    }
  }

  

  

 
}