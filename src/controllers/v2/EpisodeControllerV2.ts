import { Request, Response } from 'express';

import { EpisodeServiceV2 } from '../../services/v2/EpisodeServiceV2';


export class EpisodeControllerV2 {

  public async getAllEpisode(req: Request, res: Response): Promise<Response> {
    try {
      const seasons = await EpisodeServiceV2.getAllEpisode();
      return res.json(seasons);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }


public async createEpisode(req: Request, res: Response): Promise<Response> {
    const {seasonId, epNo, title, serieId, durationMin} = req.body;

    
    
    
    try {
       
    const episode = await EpisodeServiceV2.createEpisode(seasonId, epNo, serieId, title, durationMin);
    return res.status(201).json({ message: 'episode créé avec succès', episode });
    
     
     }
    catch (error: unknown) {
     return res.status(400).json({message : "serie ou saison n'existe pas"})
    
  }}


  public async createEpisodeWithId(req: Request, res: Response): Promise<Response> {
    const { epNo, title, durationMin} = req.body;

    
    const serieId = req.params.id
    const seasonId = req.params.seasonId
    
    try {
        if(serieId !== undefined && seasonId !== undefined){
            const episode = await EpisodeServiceV2.createEpisode(seasonId, epNo, serieId, title, durationMin);
            return res.status(201).json({ message: 'episode créé avec succès', episode });
    }
     else{
        return res.status(400).json({ message: 'serie ou saison introuvable' });
    }
     }
    catch (error: unknown) {
     return res.status(400).json({message : "serie ou saison n'existe pas"})
    
  }}
}