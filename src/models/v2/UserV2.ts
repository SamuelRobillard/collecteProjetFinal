import mongoose, { Schema, Document } from 'mongoose';
import Media from '../v1/Media';  // Importer la classe Media si nécessaire

// Définition de l'interface pour User
interface IUser extends Document {
    
    username: string;
    nom : string,
    email: string;
    password: string;
    role: string;
    favorites: Media[]; // Assure-toi que `Media` est un modèle Mongoose ou un type valide
}

// Définition du schéma pour User
const UserMongoSchema: Schema = new Schema({
    
    username: { type: String, required: true },
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Media' }]
  }, {
    timestamps: true
  });

// Créer et exporter le modèle
const UserMongo = mongoose.model<IUser>('User', UserMongoSchema);

export {UserMongo}; export type {IUser}
