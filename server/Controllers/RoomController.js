import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

//API to create a new room for a hotel
export const createRoom = async(req, res)=>{
    try {
        const {roomType, pricePerNight, amenities} = req.body;
        const Hotel = await Hotel.findOne({owner:req.auth.userId})

        if (!hotel) return res.json({success: false, message: "No Hotel found"});

        //upload images to cloudinary
        const uploadImages = req.files.map(async(file) =>{
           const response = await cloudinary.uploader.upload(file.path);
           return response.secure_url;
        })
        // Wait for all uploads to complete
        const images = await Promise.all(uploadImages)

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities:JSON.parse(amenities),
            images,
         })
         res.json({success:true, message:"Room created successfully"})

    } catch (error) {

         res.json({success:false, message:error.message})        
    }
}

//API to get all rooms
export const getrooms = async(req, res)=>{
    try {
        const rooms = await Room.find({isaAvailable: true}).populate({
            path: 'hotel',
            populate:{
                path:'owner',
                select: 'image'
            }
        }).sort({createdAt: -1})
        res.json({success:true ,rooms});
    } catch (error) {
        res.json({success:false ,message:error.message});
    }
}


//API to get all rooms for A SPECIFIC Hotel
export const getOwnerRooms = async(req, res)=>{
    try {
        const hotelData = await Hotel({owner: req.auth.userId})
        const rooms = await Room.find({hotel: hotelData._id.toString()}).populate("hotel");
        res.json({success: true , rooms});
    } catch (error) {
        res.json({success: false , message: error.message});
    }
}

//API to toggle availability of a rooom
export const toggleRoomAvalibility = async(req, res)=>{
    try {
        const{ roomId } = req.body;
        const roomData = await Room.findById(roomId)
        roomData.isAvaiilable = !roomData.isAvaiilable;
        await roomData.save();
        res.json({success: true, message: "Room Availability Updated"});
    } catch (error) {
        res.json({success: false , message: error.message});
    }
}
