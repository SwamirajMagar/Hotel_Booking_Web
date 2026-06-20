import express from "express"
import "dotenv/config";
import cors from "cors"
import connectDB from "./Configs/db.js";
import {clerkMiddleware} from '@clerk/express'
import clerkWebhooks from "./Controllers/clerkWebhooks.js";

connectDB()

const app = express()
app.use(cors())

//Middleware
app.use(express.json())
app.use(clerkMiddleware())

//API TO LISTEN CLERK WEBHOOK
app.use("/api/clerk" , clerkWebhooks)

app.get('/', (req, res)=> res.send("API is working"))

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));