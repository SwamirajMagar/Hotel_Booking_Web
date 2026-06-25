import User from "../models/User.js";
import { Webhook } from "svix";


const clerkWebhooks = async(req, res)=>{
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // getting hearders
        const headers = {
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"],
        };

        // Verifing Headers
        await whook.verify(JSON.stringify(req.body), headers)

        // Getting data from req body
        const {data, type} = req.body

        const userData = {
            _id : data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.last_name,
            image: data.image_url,
        }
        // switch case for diff events
        switch (type) {
            case "user.created":{
                await User.create(userdata);
                break;
               }

            case "user.updated":{
                await User.findbyIdAndUpdate(data.id,userdata);
                break;
               }
                
            case "user.deleted":{
                await User.findbyIdAndDelete(data.id);
                break;
               }
                
            default:
                break;
        }
        res.json({success: true , message: "Webhook recieved"})

    } catch (error) {
        console.log(error.message);
        res.json({success:false , message:error.message})
        
    }
}

export default clerkWebhooks;