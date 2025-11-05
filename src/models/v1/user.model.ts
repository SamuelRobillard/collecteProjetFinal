import { UserInterface } from '../../interfaces/user.interface';

export class UserModel implements UserInterface {
  constructor(public id: number, public username: string, public email: string, public password: string) {}
}