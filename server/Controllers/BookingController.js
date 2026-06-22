import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


//Function to check availibility of ROOMS
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        })
        const isAvaiilable = bookings.length === 0;
        return isAvaiilable;
    } catch (error) {
        console.log(error.message);

    }
}

//API to check availibility of room
//POST /api /bookings/check-availabilty
export const checkAvailibilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvaiilable = await checkAvailability({ checkInDate, checkOutDate, room });
        res.json({ success: true, isAvaiilable })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//API to crsete a new booking
//POST /API/ BOOKINGS/BOOK
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;
        //before Booking check AVailibility
        const isAvaiilable = await checkAvailability({ room, checkInDate, checkOutDate })
        if (!isAvaiilable) {
            return res.json({ success: false, message: "Room is not available" })
        }
        //Get totalprice from room
        const roomData = await Room.findById(room).populate("hotel")
        let TotalPrice = roomData.pricePerNight;

        //calculate totalprice based on nights
        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timediff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timediff / (1000 * 3600 * 24));

        TotalPrice *= nights;

        const booking = await Booking.create({
            user,
            room,
            hotel: roomdData.hotel._id,
            guests,
            checkInDate,
            checkOutDate,
            TotalPrice,
        })
        res.json({ success: true, message: "Booking created successfully" })

    } catch (error) {
        console.log(error);

        res.json({ success: false, message: "Booking created failed!!" })
    };
}
//API to get all bookings for a user
//GET /api/bookings/user
export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({ user }).populate("room hotel").sort({
            createAt: -1
        })
        res.json({ success: true, bookings })
    } catch (error) {
        res.json({ success: false, mesage: "failed to fetch bookings" })
    }
}

export const getHotelBookings = async (req, res) => {

    try {
        const hotel = await Hotel.findOne({ owner: req.auth.userId })
        if (!hotel) {
            return res.json({ success: false, message: "No Hotel Found" })

        }
        const bookings = await Booking.find({ hotel: hotel._id }).populate("room hotel user").sort({ createdAt: -1 });
        //total Bookings
        const totalBookings = bookings.length;
        //Total Revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.TotalPrice, 0)

        res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings } })
    } catch (error) {
         res.json({ success: false,message:"falied to fatch bookings"})
    }
}