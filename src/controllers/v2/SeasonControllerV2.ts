import { Request, Response } from 'express';
import { SeasonServiceV2 } from '../../services/v2/SeasonServiceV2';


export class SeasonControllerV2 {

  public async getAllSeason(req: Request, res: Response): Promise<Response> {
    try {
      const seasons = await SeasonServiceV2.getAllseason();
      return res.json(seasons);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }





  public async createSeason(req: Request, res: Response): Promise<Response> {
    const {seasonNo, episodes, serieId} = req.body;

    
    
    try {
      const user = await SeasonServiceV2.createSeason(seasonNo, episodes, serieId );
      return res.status(201).json({ message: 'Season créé avec succès', user });
    } catch (error: unknown) {
     return res.status(400).json({message : "serie n'existe pas"})
    
  }}

  public async createSeasonWithSerie(req: Request, res: Response): Promise<Response> {
    const {seasonNo, episodes} = req.body;
    const serieId = req.params.id
    
    
    try {
        if(serieId !== undefined){
            const user = await SeasonServiceV2.createSeason(seasonNo, episodes, serieId );
            return res.status(201).json({ message: 'Season créé avec succès', user });
    }
    else{
        return res.status(400).json({ message: 'serie non trouve' });
    }
    } catch (error: unknown) {
     return res.status(400).json({message : "serie n'existe pas"})
    
  }}
}