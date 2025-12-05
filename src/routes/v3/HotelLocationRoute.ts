import { Router } from 'express';

import { HotelController } from '../../controllers/v3/hotelController';
import { HotelLocationController } from '../../controllers/v3/HotelLocationController';
import { AccessDataController } from '../../controllers/v3/AccessDataController';





const router = Router();
const hotelLocationController = new HotelLocationController();
const accessDataController = new AccessDataController();

router.get('/hotelsLocationByCity', accessDataController.getDataInfoByCity);

router.put('/hotelsLocation/:id',hotelLocationController.updateHotelLocation)




export default router;