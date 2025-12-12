import { Router } from 'express';

import { HotelController } from '../../controllers/v3/hotelController';
import { HotelLocationController } from '../../controllers/v3/HotelLocationController';
import { AccessDataController } from '../../controllers/v3/AccessDataController';
import { authMiddleware } from '../../middleswares/authentificationMiddleswares';
import { adminMiddleware } from '../../middleswares/adminMiddleware';

const router = Router();
const hotelLocationController = new HotelLocationController();
const accessDataController = new AccessDataController();

router.get('/hotelsLocationByCity', accessDataController.getDataInfoByCity);
router.get('/hotelsbestratioprice', accessDataController.getTop10HotelPriceRatioByCity);

router.put('/hotelsLocation/:id', authMiddleware, adminMiddleware, hotelLocationController.updateHotelLocation)

export default router;    