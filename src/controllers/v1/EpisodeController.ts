import { Request, Response } from 'express';
import { EpisodeService } from '../../services/v1/EpisodeService';
import Episode from '../../models/v1/Episode';
export default class EpisodeController {

  public static async getAllEpisode(req: Request, res: Response): Promise<void> {

    const users = await EpisodeService.getAllEpisodes()
    res.json(users);
  }
  public static async createEpisode(episode: Episode): Promise<boolean> {


    return EpisodeService.createEpisode(episode)
  }


  public static async deleteEpisode(idtoRemove: string | undefined): Promise<boolean> {

    return EpisodeService.deleteEpisode(idtoRemove)
  }

}