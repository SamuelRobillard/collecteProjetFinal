import { Request, Response } from 'express';
import { SeasonServiceV2 } from '../../services/v2/SeasonServiceV2';
import { RatingServiceV2 } from '../../services/v2/RatingServiceV2';
import { IRating } from '../../models/v2/RatingV2';
import { AuthRequest } from '../../middleswares/authentificationMiddleswares';
import { MovieServiceV2 } from '../../services/v2/MovieServiceV2';
import MovieV2 from '../../models/v2/MovieV2';


export class RatingControllerV2 {

  public async getAllRatingOfMovie(req: Request, res: Response): Promise<Response> {
    const movieId = req.params.movieId
   
    try {
        if(movieId !== undefined){
          const rating = await RatingServiceV2.getAllRatingOfMovie(movieId);
        return res.json(rating);
        }
        return res.status(400).json({message : "movieId doit etre string"})
    } catch (error) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }

    
  }
   public async getAllRatingOfSerie(req: Request, res: Response): Promise<Response> {
    const serieId = req.params.serieId
    
    try {
        if(serieId !== undefined){
          const rating = await RatingServiceV2.getRatingSerie(serieId);
        return res.json(rating);
        }
        else{
             return res.status(400).json({message : "movieId doit etre string"})
        }
       
    } catch (error) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }

    
  }


 public async getAllRating(req: Request, res: Response): Promise<Response> {
    try {
      const rating = await RatingServiceV2.getAllRating();
      return res.json(rating);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }
  public async recoMovie(req: Request, res: Response): Promise<Response> {
    try {
      const genre = req.query.genre;
      
      
      if (typeof(genre) == "string") {
        const MoviesThatHaveHighRating = [];
        
    
        const moviesGenre = await MovieServiceV2.getMoviesByGender(genre);

       
        for (const movie of moviesGenre) {
          
          const rating = await RatingServiceV2.getAllRatingOfMovie(movie.id);
          
            const NumberRating = Number(rating)
            
            if (NumberRating > 2) {
            
              MoviesThatHaveHighRating.push(movie);
            }
          }
          
          
        
        
        
       
        return res.json(MoviesThatHaveHighRating);
      }
  
     
      return res.status(401).json({ message: "Genre n'existe pas" });
      

    } catch (error) {
   
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }


  public async createRating(req: AuthRequest, res: Response): Promise<Response> {
    const { target, targetId, score, review} = req.body;
    
    const userId = req.user.id;
    
    try {
      const rating = await RatingServiceV2.createRating(userId, target, targetId, score, review );
      return res.status(201).json({ message: 'rating créé avec succès', rating });
    } catch (error: unknown) {
     return res.status(400).json({message : "quelque chose n'existe pas"})
    
  }}
}