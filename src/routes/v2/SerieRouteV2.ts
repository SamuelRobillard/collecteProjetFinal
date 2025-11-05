import { Router } from 'express';

import { SerieControllerV2 } from '../../controllers/v2/SerieControllerV2';
import { authMiddleware } from '../../middleswares/authentificationMiddleswares';
import { adminMiddleware } from '../../middleswares/adminMiddleware';
import { ValidateSerie } from '../../middleswares/validateSerieMiddleware';
import { ValidateSeason } from '../../middleswares/validateSeasonMiddleware';
import { SeasonControllerV2 } from '../../controllers/v2/SeasonControllerV2';
import { ValidateEpisode } from '../../middleswares/validateEpisodeMiddleware';
import { EpisodeControllerV2 } from '../../controllers/v2/EpisodeControllerV2';


const router = Router();
const serieControllerV2 = new SerieControllerV2()
const seasonControllerV2 = new SeasonControllerV2()
const episodeControllerV2 = new EpisodeControllerV2()


router.post('/serie', authMiddleware, adminMiddleware, ValidateSerie, serieControllerV2.createSerie)

router.get('/series', serieControllerV2.searchSerie);
router.post('/series/:id/seasons', authMiddleware, adminMiddleware, ValidateSeason, seasonControllerV2.createSeasonWithSerie)
router.post('/series/:id/seasons/:seasonId/episodes', authMiddleware, adminMiddleware, ValidateEpisode, episodeControllerV2.createEpisodeWithId)

export default router;