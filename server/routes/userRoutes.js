import express from "express";
import { getUserData, storeRecentSearchedCities } from "../Controllers/Usercontroller";
import { protect } from "../Middleware/AthMiddleware";

const userRouter = express.Router();

userRouter.get('/',protect, getUserData);
userRouter.post('/store-recent-search',protect, storeRecentSearchedCities);


export default userRouter;