import mongoose from "mongoose";
import Job from "../models/job.model.js";

// Each person completes 1 of the following:
export const getAllJobs = async (req, res) => {
    try {
        // Query the database to fetch all jobs
        const jobs = await Job.find();

        // Return a success response with the fetched data
        res.status(200).json({
            success: true,
            message: "Jobs retrieved successfully",
            data: jobs,
        });
    } catch (error) {
        // Handle errors and return a failure response
        console.error("Error fetching jobs:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve jobs",
            error: error.message,
        });
    }
}

export const createJob = async (req, res) => {
    // To Do
}

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const job = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Job not found' });
    }

    try {
        const updatedJob = await Job.findByIdAndUpdate(id, job, { new: true })
        res.status(200).json({ success: true, data: updatedJob });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


export const deleteJob = async (req, res) => {
    // To Do
}