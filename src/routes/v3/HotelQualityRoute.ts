import { Router } from 'express';

import { HotelController } from '../../controllers/v3/hotelController';
import { HotelLocationController } from '../../controllers/v3/HotelLocationController';
import { HotelQualityController } from '../../controllers/v3/HotelQualityController';
import { authMiddleware } from '../../middleswares/authentificationMiddleswares';
import { adminMiddleware } from '../../middleswares/adminMiddleware';

const router = Router();
const hotelQualityController = new HotelQualityController()
router.get('/hotelQuality', hotelQualityController.createHotelQuality);
router.post('/hotelQuality', authMiddleware, adminMiddleware, hotelQualityController.createHotelQuality);
router.put('/hotelQuality/:id',authMiddleware, adminMiddleware, hotelQualityController.updateHotelQuality);

export default router;