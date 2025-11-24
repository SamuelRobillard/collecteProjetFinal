import { Router } from 'express';

import { HotelController } from '../../controllers/v3/hotelController';
import { HotelLocationController } from '../../controllers/v3/HotelLocationController';
import { HotelQualityController } from '../../controllers/v3/HotelQualityController';





const router = Router();
const hotelQualityController = new HotelQualityController()
router.get('/hotelQuality', hotelQualityController.createHotelQuality);
router.post('/hotelQuality', hotelQualityController.createHotelQuality);
router.put('/hotelQuality/:id', hotelQualityController.updateHotelQuality);





export default router;