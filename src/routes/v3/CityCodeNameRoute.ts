import { Router } from 'express';
import { CityCodeNameController } from '../../controllers/v3/CityCodeNameController';
import { ValidateCityCodeName } from '../../middleswares/v3/validateCityCodeName';
import { CityCodeNameService } from '../../services/v3/CityCodeNameService';





const router = Router();
const cityCodeNameController = new CityCodeNameController()

router.get('/citycodename', cityCodeNameController.getCityCodeName);

// router.get('/CityCodeName/Name', cityCodeNameController.getAllEpisode);
// router.get('/CityCodeName/Code', cityCodeNameController.getAllEpisode);
// router.get('/users/:id/medias', userController.getAllMediaOfUser)
router.post('/citycodename', ValidateCityCodeName, cityCodeNameController.createCityCodeName)



export default router;