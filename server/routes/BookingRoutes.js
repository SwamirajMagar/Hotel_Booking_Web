import express from "express"
import { checkAvailibilityAPI, 
         createBooking, 
         getHotelBookings, 
         getUserBookings
} from "../Controllers/BookingController.js";
import { protect } from "../Middleware/AuthMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availibility', checkAvailibilityAPI);
bookingRouter.post('/Book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/hotel', protect, getHotelBookings);

export default bookingRouter;