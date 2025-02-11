import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    poster: { // ID of the user who posted the job
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: [{ // Array of image URLs for the job
        type: String,
        required: true, 
    }],
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Open", "Closed"],
        default: "Open",
    }
}, {
    timestamps: true // Creates createdAt and updatedAt fields
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
