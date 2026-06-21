import express from "express";
import { protect } from "../Middleware/AuthMiddleware.js";
import { registerHotel } from "../Controllers/HotelController.js";

const hotelRouter = express.Router();

hotelRouter.post('/', protect, registerHotel);

export default hotelRouter;