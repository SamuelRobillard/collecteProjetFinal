import { Router } from 'express';
import { Request, Response } from 'express';
import SaisonController from '../../controllers/v1/SaisonController';
import { SaisonService } from '../../services/v1/SaisonService';
import Saison from '../../models/v1/Saison';
const router = Router();


router.get('/saisons', SaisonController.getAllSaison)

router.post('/saisons', async (req: Request, res: Response) => {



    const seasonNumber = req.body.seasonNumbers
    const releaseDate = req.body.releaseDate
    const episodesId = req.body.episodesId



    const id = (SaisonService.getMaxId() + 1).toString()

    if (SaisonService.allIdExists(episodesId)) {
        const saisons = new Saison(id, seasonNumber, releaseDate, episodesId);
        SaisonController.createSaison(saisons)
        res.status(201).send('saison enregistré');
    }
    else {
        res.status(400).send('episode non existante');
    }




});

router.delete('/saison/:id', async (req, res) => {
    // verifie que le id est un string et qu'il peut etre convertie en nombre
    if (typeof (req.params.id) == "string" && Number(req.params.id)) {
        if (await SaisonController.deleteSaison(req.params.id)) {
            res.status(201).send("Saison deleted")
        }
        else {
            res.status(400).send("Saison non existant")
        }

    }
    else {
        res.status(403).send('id non valide');
    }



});


export default router;