import { Router } from 'express';
import { CityCodeNameController } from '../../controllers/v3/CityCodeNameController';
import { ValidateCityCodeName } from '../../middleswares/v3/validateCityCodeName';
import { CityCodeNameService } from '../../services/v3/CityCodeNameService';
import { AccessDataController } from '../../controllers/v3/AccessDataController';
import { authMiddleware } from '../../middleswares/authentificationMiddleswares';
import { adminMiddleware } from '../../middleswares/adminMiddleware';

const router = Router();
const cityCodeNameController = new CityCodeNameController()
const accessDataController = new AccessDataController();
router.get('/citycodename', cityCodeNameController.getCityCodeName);
router.get('/cityuniquename', cityCodeNameController.getAllUniqueName);

// router.get('/CityCodeName/Name', cityCodeNameController.getAllEpisode);
// router.get('/CityCodeName/Code', cityCodeNameController.getAllEpisode);
// router.get('/users/:id/medias', userController.getAllMediaOfUser)
router.post('/citycodename', authMiddleware, adminMiddleware, ValidateCityCodeName, cityCodeNameController.createCityCodeName)
router.get('/cityName', accessDataController.getCityNames);


export default router;