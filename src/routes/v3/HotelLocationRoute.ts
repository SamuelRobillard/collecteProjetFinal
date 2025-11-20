import { Router } from 'express';

import { HotelController } from '../../controllers/v3/hotelController';
import { HotelLocationController } from '../../controllers/v3/HotelLocationController';





const router = Router();
const hotelLocationController = new HotelLocationController()

router.get('/hotelsLocationByCity', hotelLocationController.getHotelLocationByCity);





export default router;