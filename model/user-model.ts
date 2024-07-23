import mongoose, { Schema } from "mongoose";

const userContactSchema: Schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Firstname is required"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "LastName is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    },
    mobile: {
        type: Number,
        required: [true, "Mobile is required"],
    }
}, {
    timestamps: true,
}
);

const UserContacts = mongoose.models.users || mongoose.model("user_contacts", userContactSchema);

export default UserContacts;