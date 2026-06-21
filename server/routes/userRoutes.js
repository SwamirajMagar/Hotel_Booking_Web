import express from "express";
import { getUserData, storeRecentSearchedCities } from "../Controllers/UserController.js";
import { protect } from "../Middleware/AuthMiddleware.js";

const userRouter = express.Router();

userRouter.get('/',protect, getUserData);
userRouter.post('/store-recent-search',protect, storeRecentSearchedCities);


export default userRouter;