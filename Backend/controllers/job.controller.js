import mongoose from "mongoose";
import Job from "../models/job.model.js";

// Each person completes 1 of the following:
export const getAllJobs = async (req, res) => {
// To Do
}

export const createJob = async (req, res) => {
    try {
        // Destructure the job data from the request body
        const { category, title, description, poster, price, images, location, status } = req.body

        // Validate that all fields are provided
        if (!category || !title || !description || !poster || !price || !images || !location || !status) {
            return res.status(400).json({
                success: false,
                message: "All fields are required", // Return a 400 Bad Request if any field is missing
            })
        }

        // Create a new job document
        const newJob = new Job({
            category,
            title,
            description,
            poster,
            price,
            images,
            location,
            status,
        })

        // Save the new job to the database
        const savedJob = await newJob.save();

        // Return a success response with the saved job data
        res.status(201).json({
            success: true,
            message: "Job created successfully",
            data: savedJob,
        })
    } catch (error) {
        // Catch any errors and return a failure response
        console.error("Error creating job:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create job",
            error: error.message,
        })
    }
}

export const updateJob = async (req, res) => {
    // To Do
}

export const deleteJob = async (req, res) => {
    // To Do
}