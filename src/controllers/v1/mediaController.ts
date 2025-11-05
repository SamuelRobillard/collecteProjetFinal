import { Request, Response } from 'express';
import Media from '../../models/v1/Media';
import { MediaService } from '../../services/v1/MediaService';
export default class MediaController {

  public static async getAllMedia(req: Request, res: Response): Promise<void> {
    console.log(req.params.id)
    const users = await MediaService.getAllMedias(req.query);

    res.json(users);
  }
  public static async createMedia(media: Media): Promise<boolean> {


    return MediaService.createMedia(media)
  }


  public static async deleteMedia(idtoRemove: string | undefined): Promise<boolean> {

    return MediaService.deleteMedia(idtoRemove)
  }

}