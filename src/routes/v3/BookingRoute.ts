import { Router } from "express";

import { BookingController } from "../../controllers/v3/BookingController";
import { validateBookingDates } from "../../middleswares/v3/validateBookingDates";
import { authMiddleware } from "../../middleswares/authentificationMiddleswares";

const router = Router();
const bookingController = new BookingController();

router.get("/booking", bookingController.getBookingsByUserId);

router.post("/booking", authMiddleware, validateBookingDates, bookingController.createBooking);
router.delete("/booking", authMiddleware, bookingController.deleteBookingByHotelId);

export default router;
