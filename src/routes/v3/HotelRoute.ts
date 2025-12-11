import { Router } from 'express';

import { HotelController } from '../../controllers/v3/hotelController';
import { adminMiddleware } from '../../middleswares/adminMiddleware';
import { authMiddleware } from '../../middleswares/authentificationMiddleswares';
import { AccessDataController } from '../../controllers/v3/AccessDataController';

const router = Router();
const hotelController = new HotelController()
const accessDataController = new AccessDataController()
router.get('/hotels', accessDataController.getAllHotelDto);
router.get('/hotels-csv', accessDataController.getHotelsCsv);

router.get('/lotOfHotel', hotelController.getLotsOfHotel);
router.post('/hotel', authMiddleware, adminMiddleware, hotelController.createHotel);

export default router;