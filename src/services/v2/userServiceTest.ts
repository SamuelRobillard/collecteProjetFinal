import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import {UserMongo, IUser } from "../../models/v2/UserV2";

import MovieV2, { IMovie } from '../../models/v2/MovieV2';

export class UserServiceV2 {

  // Créer un utilisateur
  public static async createUser(
    username: string,
    email: string,
    password: string,
    role: string = 'user',
    favorites: Types.ObjectId[] = []
  ): Promise<IUser> {
    // Vérifier si l'email existe déjà
    const existingUser = await UserMongo.findOne({ email });
    if (existingUser) {
      throw new Error('Cet email est déjà utilisé.');
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const user = new UserMongo({
      username,
      email,
      password: hashedPassword,
      role,
      favorites,
    });

    await user.save();
    return user;
  }

  // Récupérer tous les utilisateurs (sans mot de passe)
  public static async getAllUsers(): Promise<IUser[]> {
    return await UserMongo.find().select('-password');
  }

  // Récupérer un utilisateur par son ID MongoDB
  public static async findById(id: string): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID invalide');
    }
    return await UserMongo.findById(id).select('-password');
  }

  // Récupérer les medias favoris d’un utilisateur
  public static async getAllMediaOfUser(idUser: string): Promise<IMovie[]> {
    if (!Types.ObjectId.isValid(idUser)) {
      throw new Error('ID utilisateur invalide');
    }

    const user = await UserMongo.findById(idUser);
    if (!user) throw new Error('Utilisateur non trouvé');

    // Récupération des medias depuis MongoDB
    const allMedia = await MovieV2.find({ _id: { $in: user.favorites } });
    return allMedia;
  }

  // Vérifier les identifiants et retourner user si ok
  public static async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await UserMongo.findOne({ email });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
