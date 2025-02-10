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
    // To Do
}

export const deleteJob = async (req, res) => {
    // To Do
}