import { Router } from 'express';
import express, { Request, Response } from 'express';
import { MediaService } from '../../services/v1/MediaService';
import MediaController from '../../controllers/v1/mediaController';
import Film from '../../models/v1/Film';
import Serie from '../../models/v1/Serie';
import { validateMedia } from '../../middleswares/validationMiddleswares';
import { SaisonService } from '../../services/v1/SaisonService';
const router = Router();


router.get('/medias', MediaController.getAllMedia)

router.post('/medias', validateMedia, async (req: Request, res: Response) => {

    const type = req.body.type
    const titre = req.body.titre
    const genre = req.body.genre
    const year = req.body.year
    const rating = req.body.rating



    const id = (MediaService.getMaxId() + 1).toString()
    if (type == "film") {
        const duaration = req.body.duration
        const watched = req.body.watched
        const media = new Film(id, titre, genre, year, rating, duaration, watched);
        MediaController.createMedia(media)
        res.status(201).send('Media enregistré');
    }
    else if (type == "serie") {
        const status = req.body.status
        const saisonsId = req.body.saisonsId

        if (SaisonService.allIdExists(saisonsId)) {
            const media = new Serie(id, titre, genre, year, rating, status, saisonsId);
            MediaController.createMedia(media)
            res.status(201).send('Media enregistré');
        }
        else {
            res.status(400).send('saison non existante');
        }

    }
    else {
        res.status(400).send('type non valide');
    }

});


router.put('/medias/:id', async (req: Request, res: Response) => {





    const id = req.params.id
    if (typeof (id) == "string") {


        MediaService.updateMedia(id, req.body)
        res.status(201).send('Media  modifier');
    }





    else {
        res.status(400).send('id non valide');
    }

});

router.delete('/medias/:id', async (req, res) => {
    // verifie que le id est un string et qu'il peut etre convertie en nombre
    if (typeof (req.params.id) == "string" && Number(req.params.id)) {
        if (await MediaController.deleteMedia(req.params.id)) {
            res.status(201).send("Media deleted")
        }
        else {
            res.status(400).send("Media non existant")
        }

    }
    else {
        res.status(403).send('id non valide');
    }



});



export default router;