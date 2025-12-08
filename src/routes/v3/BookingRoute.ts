import { Router } from "express";

import { BookingController } from "../../controllers/v3/BookingController";
import { validateBookingDates } from "../../middleswares/v3/validateBookingDates";

const router = Router();
const bookingController = new BookingController();

router.get("/booking", bookingController.getBookingsByUserId);
router.post("/booking",validateBookingDates, bookingController.createBooking);
router.delete("/booking",bookingController.deleteBookingByHotelId);

export default router;
