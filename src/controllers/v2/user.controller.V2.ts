import { Request, Response } from 'express';

import {UserServiceV2} from "../../services/v2/user.service.v2";
import { HttpError } from '../../utils/HttpError';
import { AuthRequest } from '../../middleswares/authentificationMiddleswares';
import { IUser } from '../../models/v2/UserV2';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
export class UserControllerV2 {
  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserServiceV2.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }
  public async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      if(id != undefined){
        const users = await UserServiceV2.getuserById(id);
        return res.json(users);
      }
      return res.status(400).json({message : "id invalide"})
    } catch (error) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }


   public async login(req: Request, res: Response): Promise<void> {
     const users: IUser[] = await UserServiceV2.getAllUsers()
        const user = users.find(user => user.email === req.body.email);
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            
            const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
            const accessToken = jwt.sign({id : user._id,  email: user.email, role : user.role }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ accessToken });
        } else {
            res.status(403).send('email ou mot de passe incorrect');
        }
  }

  public async updateUser (req: AuthRequest, res: Response) : Promise<void> {
  try {
    const id = req.user.id
    const updatedUser = await UserServiceV2.updateUser(id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      console.error(err);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
};


 



  public async createUser(req: Request, res: Response): Promise<Response> {
    const {nom, username, email, password, role, favorites } = req.body;

    // Vérification si le mot de passe est fourni
    if (!password) {
       return res.status(400).json({ message: 'Le mot de passe est requis.' });
    }

    try {
      const user = await UserServiceV2.createUser(nom, username, email, password, role, favorites);
      return res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    } catch (error: unknown) {
      if (error instanceof HttpError) {
       return res.status(error.statusCode).json({ message: error.message });
        // Vérifie ici que le message est bien passé
         
      } else {
        // Si l'erreur n'est pas de type Error, on renvoie une réponse générique
        console.error('Erreur inconnue:', error);
        return res.status(500).json({ message: 'Erreur inconnue' });
      }
    }
    
  }
}