import { Request, Response } from 'express';
import { MovieServiceV2 } from '../../services/v2/MovieServiceV2';
import { AuthRequest } from '../../middleswares/authentificationMiddleswares';
import { HttpError } from '../../utils/HttpError';



export class MovieControllerV2 {






  public async createMovie(req: Request, res: Response): Promise<Response> {
    const {title, genre, releaseDate, durationMin, synopsis } = req.body;

    // Vérification si le mot de passe est fourni
    
    try {
      const movie = await MovieServiceV2.creatMovie(title, genre, releaseDate, durationMin, synopsis );
      return res.status(201).json({ message: 'Movie créé avec succès', movie });
    } catch (error: unknown) {
     return res.status(400).json({message : "probleme creation de movie"})
    
  }}


   public async updateMovie (req: AuthRequest, res: Response) : Promise<void> {
    try {
      const id = req.params.id
      if(id !== undefined){
        const updatedUser = await MovieServiceV2.updateMovie(id, req.body);
      res.status(200).json(updatedUser);
      }
      
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur.' });
      }
    }
  };
  public async deleteMovie (req: Request, res: Response) : Promise<void>  {
  try {
    const id = req.params.id
    if(id !== undefined){
      await MovieServiceV2.deleteMovieById(id);
    res.status(204).send(); 
    }
    
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
};

public async searchMovies(req: Request, res: Response): Promise<Response> {
  try {
    const { title, genre, minYear, maxDur, page, limit } = req.query;

    // Convertir `page` et `limit` en nombres, et vérifier leur validité
    const pageNum = Number(page) || 1; // Par défaut page = 1 si non défini
    const limitNum = Number(limit) || 10; // Par défaut limit = 10 si non défini

    // Valider les paramètres de pagination
    if (pageNum < 1) {
      return res.status(400).json({ message: 'La page doit être ≥ 1.' });
    }
    if (limitNum < 1 || limitNum > 100) {
      return res.status(400).json({ message: 'Le nombre d\'éléments par page doit être entre 1 et 100.' });
    }

    // Construire l'objet `query` pour la recherche
    const query: Record<string, any> = {};

    if (title) query.title = { $regex: title, $options: 'i' }; // Recherche insensible à la casse
    if (genre) query.genre = { $regex: genre, $options: 'i' };
    if (minYear) query.releaseDate = { $gte: new Date(Number(minYear), 0, 1) }; // Minimum année
    if (maxDur) query.durationMin = { $lte: Number(maxDur) }; // Durée maximum

    // Calculer l'offset pour la pagination
    const skip = (pageNum - 1) * limitNum;

    // Appeler le service pour rechercher les films avec pagination
    const { Movies, total } = await MovieServiceV2.searchMovies(query, skip, limitNum);

    // Calculer le nombre total de pages
    const pages = Math.ceil(total / limitNum);

    return res.json({
      Movies,
      total,
      page: pageNum,
      pages,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

}