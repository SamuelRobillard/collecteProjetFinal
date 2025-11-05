

import {UserMongo, IUser } from "../../models/v2/UserV2";
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import MovieV2, { IMovie } from "../../models/v2/MovieV2";
import { HttpError } from "../../utils/HttpError";


export class MovieServiceV2 {


  
  public static async creatMovie(title: string, genre: string, releaseDate: Date, durationMin: number, synopsis: string): Promise<any> {
   
    
    // Créer un nouvel utilisateur
    const Movie = new MovieV2({
       title,
       genre,
       releaseDate,
       durationMin,
       synopsis
     
    });

    // Sauvegarder l'utilisateur dans la base de données
    await Movie.save();
    const lastMovie = await MovieV2.findOne().sort({ _id: -1 }).exec();
    // retourne le dernier film ajouter a la bd (sert pour stocker son id dans postman et le supprimer apres
    // et etre sur que le filme qu'on supprime existe)
    return lastMovie;
  }



  public static async getAllMovie(): Promise<IMovie[]> {
    try {
      const Movies = await MovieV2.find();
      
      return Movies;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des movies: ' + error);
    }
  }

  public static async getMoviesByGender(genre : String): Promise<IMovie[]> {
    try {
      const movies = await MovieV2.find({ genre: { $regex: genre, $options: 'i' } }).exec(); // Recherche insensible à la casse
      
      return movies;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des movies: ' + error);
    }
  }

  public static async updateMovie(id: string, updateData: Partial<IMovie>): Promise<IMovie> {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpError('ID utilisateur invalide.', 400);
      }
  
      // Si on veut mettre à jour le mot de passe, on le hash
      
  
      const movie = await MovieV2.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true } // renvoie le document mis à jour
      );
  
      if (!movie) {
        throw new HttpError('Utilisateur non trouvé.', 404);
      }
  
      return movie;
    }

    public static async deleteMovieById(id: string) {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpError('ID du film invalide.', 400);
      }

      const movie = await MovieV2.findByIdAndDelete(id);

      if (!movie) {
        throw new HttpError('Film non trouvé.', 404);
      }

      return movie;
    }

    public static async searchMovies(query: Record<string, any>, skip: number, limit: number) {
      // Récupérer les films correspondant aux critères de recherche avec pagination
      const Movies = await MovieV2.find(query)
        .skip(skip)
        .limit(limit)
        .exec();
  
      // Compter le nombre total de films correspondant aux critères (sans pagination)
      const total = await MovieV2.countDocuments(query);
  
      return { Movies, total };
    }
  
 
}