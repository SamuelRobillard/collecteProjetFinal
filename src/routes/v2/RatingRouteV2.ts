import { Router } from 'express';

import { EpisodeControllerV2 } from '../../controllers/v2/EpisodeControllerV2';
import { RatingControllerV2 } from '../../controllers/v2/RatingControllerV2';

import { authMiddleware, AuthRequest } from '../../middleswares/authentificationMiddleswares';
import { createRateLimiter } from '../../middleswares/rateLimitMiddleware';

const router = Router();
const ratingControllerV2 = new RatingControllerV2()

router.get('/ratings/avg/movie/:movieId', ratingControllerV2.getAllRatingOfMovie);
router.get('/ratings/avg/serie/:serieId', ratingControllerV2.getAllRatingOfSerie);
router.get('/ratings', ratingControllerV2.getAllRating);


router.get('/reco/movie', ratingControllerV2.recoMovie);




const ratingLimiter = createRateLimiter('/api/v2/ratings');
if(ratingLimiter) router.post('/rating', ratingLimiter, authMiddleware,  ratingControllerV2.createRating)



export default router;