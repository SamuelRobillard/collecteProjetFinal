import mongoose, { Types } from "mongoose";
import SeasonsV2, { ISeason } from "../../models/v2/SeasonsV2";
import SerieV2 from "../../models/v2/SerieV2";
import EpisodeV2, { IEpisode } from "../../models/v2/EpisodeV2";
import RatingV2, { IRating } from "../../models/v2/RatingV2";
import { UserMongo } from "../../models/v2/UserV2";
import MovieV2 from "../../models/v2/MovieV2";






export class RatingServiceV2 {


  
  public static async createRating(userId : string, target : string, targetId : string, score : number, review : string): Promise<any> {
   
    //   const userExists = await UserMongo.findById(userId);
      
      
      
    // if (!userExists) {
    //   throw new Error('Le user n’existe pas');
    // }

    if(target === 'movie')
    {
        const movieExists = await MovieV2.findById(targetId);
        if(!movieExists){
            throw new Error("le movie n'existe pas")
        }
    }
    else if (target === "episode"){
        const episodeExists = await EpisodeV2.findById(targetId);
        if(!episodeExists){
            throw new Error("le movie n'existe pas")
        }
    }
    
       // Créer un nouvel utilisateur
    const rating = new RatingV2({
       userId,
       target,
       targetId,
       score,
       review,
     
    });

    // Sauvegarder l'utilisateur dans la base de données
    await rating.save();

    // Retourner l'utilisateur créé
    return rating;
  }
    
   
public static async getAllRating(): Promise<IRating[]> {
    try {
      const ratings = await RatingV2.find();
      
      return ratings
    } catch (error) {
      throw new Error('Erreur lors de la récupération des episodes: ' + error);
    }
  }


  public static async getAllRatingOfMovie(movieId : string): Promise<Number> {
    try {
      const rating = await this.getRatingByMovie(movieId)
      
      
      return rating
    } catch (error) {
      return 0
    }
  }

    static async getRatingByMovie(movieId: string): Promise<number> {
        if (!Types.ObjectId.isValid(movieId)) throw new Error('ID de série invalide');
            const result = await RatingV2.aggregate([
            // selectionne seulement les ratings qui on le bon movieId
        { $match: { targetId: new mongoose.Types.ObjectId(movieId) } },
        // fait avg de l'attribut score
        { $group: { _id: '$targetId', averageScore: { $avg: '$score' } } }
        ]);
            const average = result[0].averageScore
        return average;
        }

    static async getRatingSerie(serieId: string): Promise<number> {
        
      if (!Types.ObjectId.isValid(serieId)) throw new Error('ID de série invalide');
      
          const episodes = await EpisodeV2.find({ serieId: serieId }).select('_id');
          
          const episodeIds = episodes.map(ep => ep._id);
         
      const result = await RatingV2.aggregate([
        
        { $match: { target: 'episode', targetId: { $in: episodeIds } } },
        { $group: { _id: null, averageScore: { $avg: '$score' } } }
    ]);
        
        const average = result[0].averageScore
      return average;
    }

  
     static async getAllEpisodesOfSerie(serieId: string): Promise<IEpisode[]> {
    if (!Types.ObjectId.isValid(serieId)) throw new Error('ID de série invalide');

    return await EpisodeV2.find({ serie: serieId }); // trie par numéro d’épisode
  }
  

 
}