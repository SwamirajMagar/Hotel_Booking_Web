import express from "express";
import upload from "../Middleware/UploadMiddleware";
import { protect } from "../Middleware/AuthMiddleware.js";
import { createRoom, getOwnerRooms, getrooms, toggleRoomAvalibility } from "../Controllers/RoomController";

const roomRouter = express.Router();

roomRouter.post('/',upload.array("images", 4),protect, createRoom)
roomRouter.get('/',getrooms)
roomRouter.get('/owner',protect, getOwnerRooms)
roomRouter.post('/toggle-availability',protect, toggleRoomAvalibility)

export default roomRouter;