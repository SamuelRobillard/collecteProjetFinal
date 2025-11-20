import { Router } from 'express';

import { HotelController } from '../../controllers/v3/hotelController';





const router = Router();
const hotelController = new HotelController()

router.get('/hotel', hotelController.getHotelById);





export default router;