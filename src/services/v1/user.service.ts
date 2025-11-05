import User from '../../models/v1/User';
import { readDataUser, writeDataUser } from '../../utils/jsonHandlerUser';
import { readData, writeData } from '../../utils/jsonHandler';
import { MediaService } from './MediaService';
import Media from '../../models/v1/Media';


export class UserService {


  
  public static async createUser(user: User): Promise<boolean> {
    const data = readDataUser();
    data.push(user);
    writeDataUser(data);

    return true;
  }



  public static getAllUsers(): User[] {
    const data = readDataUser();
    return data;
  }


  public static getAllMediaOfUser(idUser: string | undefined): Media[] | string {
    const data = readDataUser();


    let users = data
    // filtre pour avoir le user qui correspond au bon id
    users = users.filter((item: any) => item.id == idUser);


    // verifie que tous les medias du user existes
    if (MediaService.idExists(users[0].favorites)) {
      const dataMedia = readData();


      let datam = dataMedia.medias
      let allMedia: Media[] = []
      // pour chaque media du user, le recherche dans la liste complete des medias et l'ajoute
      // dans une autre liste qui est retourné
      users[0].favorites.forEach((num: String, index: number) => {
        const filteredMedias = datam.filter((media: { id: any; }) => media.id == num);
        allMedia.push(filteredMedias)
      })


      console.log(allMedia)


      return allMedia


    }



    else {
      return "media non existant"
    }



  }


  public static getMaxId(): number {
    const data = readDataUser();
    let users = data
    if (users.length === 0) return 0;
    // retoune le chiffre max de tous les id des users
    return Math.max(...users.map((user: { id: any; }) => Number(user.id)));
  }

}