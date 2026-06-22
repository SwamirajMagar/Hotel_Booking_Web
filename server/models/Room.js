import mongoose from "mongoose"

const roomSchema = new mongoose.Schema({
    hotel: {type:String, ref:"Hotel", required : true},
    roomType: {type:String, required : true},
    pricePerNight: {type:Number, required : true},
    owner: {type:String, required : true, ref: "User"},
    Amenities: {type:Array, required : true},
    Images: [{type:String}],
    isAvaiilable: {type:Boolean ,default:true}
},{timestamps: true});

const Room = mongoose.model("room", roomSchema);

export default Room;