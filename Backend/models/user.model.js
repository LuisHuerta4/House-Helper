import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    completed: [{ // ID's of jobs user has completed
        type: String,
        required: false, 
    }],
    progress: [{ // ID's of jobs user has in progress
        type: String,
        required: false, 
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
