import { Request, Response } from 'express';
import { UserService } from '../../services/v1/user.service';

import User from '../../models/v1/User';
export class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<void> {

    const users = await UserService.getAllUsers();
    res.json(users);
  }

  public async getAllMediaOfUser(req: Request, res: Response): Promise<void> {

    const medias = await UserService.getAllMediaOfUser(req.params.id);
    res.json(medias);
  }

  public async createUser(user :  User): Promise<boolean> {

    return UserService.createUser(user)
  }


  
}