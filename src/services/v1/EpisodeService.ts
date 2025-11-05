import Episode from '../../models/v1/Episode';
import { readData, writeData } from '../../utils/jsonHandler';

const Episode_FIELD = ["title", "duration", "episodeNumber", "watched"];
export class EpisodeService {
  
  public static async createEpisode(episode : Episode): Promise<boolean> {
    const data = await readData();
    data.episodes.push(episode)
    writeData(data)
    return true
  }

   public static  getAllEpisodes(): Episode[]{
    // Logique pour récupérer tous les utilisateurs
    
    const data = readData();
    return data.episodes;
  }

 public static  deleteEpisode(idtoRemove : string | undefined):boolean {
    const data = readData()
    try{
      if(idtoRemove !== undefined){
        let convertToList  = [idtoRemove]
        if(this.allIdExists(convertToList)){
          data.episodes = data.episodes.filter((item: any) => item.id !== idtoRemove);
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

  public static getMaxId(): number {
  const data = readData();
  let episodes = data.episodes;
  if (episodes.length === 0) return 0;
  return Math.max(...episodes.map((episode: any) => Number(episode.id)));
}


public static allIdExists(episodesId : String[]) : boolean {
    const data = readData();
    const existingEpisodesIds = data.episodes.map((s: any) => s.id);
    
    
  // Vérifier que chaque id de saisonsId existe dans la BD
    for (const episodeId of episodesId) {
   
    if (!existingEpisodesIds.includes(episodeId)) {
        return false;
        
      
    }

  }
  return true;
    }


    public static updateEpiosde(idToFind: string, updatedFields: Partial<any>): boolean {
        try {
          const data = readData();
    
    
          const index = data.episodes.findIndex((episode: any) => episode.id == idToFind);
          if (index == -1) return false;
    
          const filteredFields: Record<string, any> = {};
          for (const key of Episode_FIELD) {
            if (updatedFields.hasOwnProperty(key)) {
              filteredFields[key] = updatedFields[key];
            }
          }
          console.log(filteredFields)
          data.episodes[index] = { ...data.episodes[index], ...filteredFields };
          console.log(data.episodes[index])
          writeData(data);
          return true;
        } catch (err) {
          console.error("Erreur updateEpisode:", err);
          return false;
        }
      }
  
}