import User from "../models/User.js";
import { Webhook } from "svix";

export const handleClerkWebhookEvent = async (type, data, UserModel = User) => {
    const userData = {
        _id: data.id,
        email: data.email_addresses?.[0]?.email_address || "",
        username: [data.first_name, data.last_name].filter(Boolean).join(" ").trim() || data.username || "Clerk User",
        image: data.image_url || "",
    };

    switch (type) {
        case "user.created":
            await UserModel.create(userData);
            break;
        case "user.updated":
            await UserModel.findByIdAndUpdate(data.id, userData, { upsert: true, new: true });
            break;
        case "user.deleted":
            await UserModel.findByIdAndDelete(data.id);
            break;
        default:
            break;
    }
};

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        const body = Buffer.isBuffer(req.body)
            ? req.body.toString("utf8")
            : typeof req.body === "string"
                ? req.body
                : JSON.stringify(req.body);

        const event = whook.verify(body, headers);
        const { data, type } = event;

        await handleClerkWebhookEvent(type, data);

        res.json({ success: true, message: "Webhook received" });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

export default clerkWebhooks;