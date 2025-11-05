import { Router } from 'express';
import { UserControllerV2 } from '../../controllers/v2/user.controller.V2';
import { MovieControllerV2 } from '../../controllers/v2/MovieControllerV2';
import { authMiddleware } from '../../middleswares/authentificationMiddleswares';
import { adminMiddleware } from '../../middleswares/adminMiddleware';
import { ValidateMovie } from '../../middleswares/validateMovieMiddlewares';


const router = Router();
const movieControllerV2 = new MovieControllerV2()


router.get('/movie', movieControllerV2.searchMovies);
// router.get('/users/:id/medias', userController.getAllMediaOfUser)
router.post('/movie', authMiddleware, adminMiddleware,ValidateMovie,  movieControllerV2.createMovie)
router.patch('/movie/:id', authMiddleware, adminMiddleware, movieControllerV2.updateMovie);

router.delete('/movie/:id', authMiddleware, adminMiddleware, movieControllerV2.deleteMovie)


export default router;