import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    listings: [{ // ID's of jobs user has posted
        type: String,
        required: true, 
    }],
    icon: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },

}, {
    timestamps: true // Creates createdAt and updatedAt fields
});

const User = mongoose.model("User", userSchema);

export default User;
