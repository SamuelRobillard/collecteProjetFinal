import { Router } from 'express';

import { HotelController } from '../../controllers/v3/hotelController';
import { adminMiddleware } from '../../middleswares/adminMiddleware';
import { authMiddleware } from '../../middleswares/authentificationMiddleswares';

const router = Router();
const hotelController = new HotelController()

router.get('/hotel', hotelController.getHotelById);
router.get('/lotOfHotel', hotelController.getLotsOfHotel);
router.post('/hotel', authMiddleware, adminMiddleware, hotelController.createHotel);

export default router;