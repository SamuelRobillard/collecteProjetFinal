import { Router } from "express";

import { BookingController } from "../../controllers/v3/BookingController";

const router = Router();
const bookingController = new BookingController();

router.get("/booking", bookingController.getBookingsByUserId);
router.post("/booking", bookingController.createBooking);

export default router;
