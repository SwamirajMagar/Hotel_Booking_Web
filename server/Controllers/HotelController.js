import Hotel from "../models/Hotel";
import User from "../models/User";

export const registerHotel = async(req, res) =>{
    try {
        const {name, address ,contact, city} = req.body;
        const owner = req.user._id

        //check if user alredy register
        const hotel = await Hotel.findOne({owner})
        if (hotel) {
            return res.json({sucees: false, message: "Hotel Already Registered" })
        }

        await Hotel.create({name, address, contact, city, owner});

        await User.findByIdAndUpdate(owner, {role: "HotelOwner"});

        res.json({sucees:true, message: "Hotel Registered Sucessfully"})

    } catch (error) {
        res.json({sucees:false, message: error.message})
    }
}