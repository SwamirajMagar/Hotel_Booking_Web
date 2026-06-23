import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema({
    user: {type:String, ref:"User", required : true},
    room: {type:String,ref:"Room", required : true},
    hotel: {type:String, ref:"Hotel",required : true},
    CheckInDate: {type:Date, required : true},
    CheckOutDate: {type:Date, required : true},  
    TotalPrice: {type:Number ,required:true},
    guest : {type:Number ,required:true},
    Status : {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    },
    paymentMethod:{
        type:String ,
        required:true,
        default: "Pay at Hotel",  
    },
    isPaid:{type:Boolean ,default:false}

},{timestamps: true});

const Booking = mongoose.model("Booking",BookingSchema);

export default Booking;