
import Media from '../../models/v1/Media';
import { readData, writeData } from '../../utils/jsonHandler';



const FILM_FIELD = ["titre", "genre", "year", "rating", "duration", "watched"];
const SERIE_FIELD = ["titre", "genre", "year", "rating", "status", "saisonsId"];
let field;


type SearchFilters = Partial<{
  id: string;
  titre: string;
  genre: string;
  year: number;
  rating: number;
  duration?: number;
  watched?: boolean;
  status?: string;
  type: string;
 
}>;

export class MediaService {



  public static async createMedia(user: Media): Promise<boolean> {
    const data = await readData();
    data.medias.push(user)
    writeData(data)



    return true
  }



public static getAllMedias(filters: SearchFilters): Media[] {
  const data = readData();

  const filteredMedias = data.medias.filter((item: any) => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined) return true;

      // Recherche stricte (égalité simple)
      return item[key] == value;
    });
  });

  return filteredMedias;
}

  public static  deleteMedia(idtoRemove : string | undefined):boolean {
    const data = readData()
    try{
      if(idtoRemove !== undefined){
        let convertToList  = [idtoRemove]
        if(this.idExists(convertToList)){
         
          data.medias = data.medias.filter((item: any) => item.id !== idtoRemove);
          writeData(data)
          return true;
        }
        return false
      }
      return false;
      
    }
    
    catch{
      return false;
    }
  }


  public static idExists(mediasId: String[]): boolean {

    const data = readData();
    let isTrue = true;
    const existingMediasIds = data.medias.map((s: any) => s.id);
    mediasId.forEach((num: String, index: number) => {
      if (!existingMediasIds.includes(num)) {
        isTrue = false;
        
      }
    });



    console.log("yes")
    return isTrue
  }

  public static updateMedia(idToFind: string, updatedFields: Partial<any>): boolean {
    try {
      const data = readData();


      const index = data.medias.findIndex((media: any) => media.id == idToFind);
      if (index == -1) return false;

      const filteredFields: Record<string, any> = {};
      console.log(data.medias[index].type)
      if (data.medias[index].type == "film") {
        field = FILM_FIELD
      }
      else {
        field = SERIE_FIELD
      }

      for (const key of field) {
        if (updatedFields.hasOwnProperty(key)) {
          filteredFields[key] = updatedFields[key];
        }
      }
      console.log(filteredFields)
      data.medias[index] = { ...data.medias[index], ...filteredFields };
      console.log(data.medias[index])
      writeData(data);
      return true;
    } catch (err) {
      console.error("Erreur updateMedia:", err);
      return false;
    }
  }


  public static getMaxId(): number {
    const data = readData();
    let medias = data.medias;
    if (medias.length === 0) return 0;

    return Math.max(...medias.map((media: any) => Number(media.id)));
  }

}