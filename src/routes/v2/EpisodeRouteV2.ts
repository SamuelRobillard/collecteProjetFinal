import { Router } from 'express';

import { EpisodeControllerV2 } from '../../controllers/v2/EpisodeControllerV2';
import { authMiddleware } from '../../middleswares/authentificationMiddleswares';
import { adminMiddleware } from '../../middleswares/adminMiddleware';
import { ValidateEpisode } from '../../middleswares/validateEpisodeMiddleware';



const router = Router();
const episodeControllerV2 = new EpisodeControllerV2()

router.get('/episode', episodeControllerV2.getAllEpisode);
// router.get('/users/:id/medias', userController.getAllMediaOfUser)
router.post('/episode', authMiddleware, adminMiddleware, ValidateEpisode, episodeControllerV2.createEpisode)



export default router;