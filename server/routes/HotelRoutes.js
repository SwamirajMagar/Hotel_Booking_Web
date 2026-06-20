import express from "express";
import { protect } from "../Middleware/AthMiddleware";
import { registerHotel } from "../Controllers/HotelController";

const hotelRouter = express.Router();

hotelRouter.post('/', protect, registerHotel);

export default hotelRouter;