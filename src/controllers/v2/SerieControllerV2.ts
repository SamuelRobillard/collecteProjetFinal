import { Request, Response } from 'express';
import { SerieServiceV2 } from '../../services/v2/SerieServiceV2';




export class SerieControllerV2 {

  public async getAllSerie(req: Request, res: Response): Promise<Response> {
    try {
      const movies = await SerieServiceV2.getAllSerie();
      return res.json(movies);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }





  public async createSerie(req: Request, res: Response): Promise<Response> {
    const {title, genre, status} = req.body;

    // Vérification si le mot de passe est fourni
    
    try {
      const user = await SerieServiceV2.creatSerie(title, genre, status );
      return res.status(201).json({ message: 'Serie créé avec succès', user });
    } catch (error: unknown) {
     return res.status(400).json({message : "probleme hehe"})
    
  }}


 public async searchSerie(req: Request, res: Response): Promise<Response> {
     try {
    const { title, status } = req.query;
    const series = await SerieServiceV2.searchSeries({
      title: title as string,
      status: status as string
    });
    return res.status(200).json(series);
  } catch (err) {
    console.error(err);
   return res.status(500).json({ message: 'Erreur serveur.' });
  }
 }
 
}