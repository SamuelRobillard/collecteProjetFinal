import { Request, Response } from 'express';
import { SaisonService } from '../../services/v1/SaisonService';
import Saison from '../../models/v1/Saison';
export default class SaisonController {

  public static async getAllSaison(req: Request, res: Response): Promise<void> {

    const saisons = await SaisonService.getAllSaisons()
    res.json(saisons);
  }
  public static async createSaison(saison: Saison): Promise<boolean> {


    return SaisonService.createSaison(saison)
  }


  public static async deleteSaison(idtoRemove: string | undefined): Promise<boolean> {

    return SaisonService.deleteSaison(idtoRemove)
  }

}