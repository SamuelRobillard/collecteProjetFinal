import { readDataUser, writeDataUser } from "../../utils/jsonHandlerUser";
import { readData, writeData } from "../../utils/jsonHandler";
import { IUser } from "../../models/v3/UserModel";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { HttpError } from "../../utils/HttpError";
import User from "../../models/v3/UserModel";

export class UserService {
  public static async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<any> {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new HttpError("Cet email est déjà utilisé.", 409);
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Utilisation du mot de passe haché
    });

    // Sauvegarder l'utilisateur dans la base de données
    await user.save();

    // Retourner l'utilisateur créé
    return user;
  }

  public static async updateUser(
    id: string,
    updateData: Partial<IUser>
  ): Promise<IUser> {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpError("ID utilisateur invalide.", 400);
    }

    // Si on veut mettre à jour le mot de passe, on le hash
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } // renvoie le document mis à jour
    );

    if (!user) {
      throw new HttpError("Utilisateur non trouvé.", 404);
    }

    return user;
  }

  public static async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await User.find();

      return users;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des utilisateurs: " + error
      );
    }
  }

  public static async getuserById(id: string): Promise<IUser | null> {
    try {
      const users = await User.findById(id);
      return users;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des utilisateurs: " + error
      );
    }
  }
}
