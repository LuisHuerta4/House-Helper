import mongoose from "mongoose";
import Job from "../models/job.model.js";

// Each person completes 1 of the following:
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();

        res.status(200).json({
            success: true,
            message: "Jobs retrieved successfully",
            data: jobs,
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve jobs", error: error.message });
    }
};


export const getJobsByCategory = async (req, res) => {
    const { category } = req.params; 

    try {
        const jobs = await Job.find({ category });

        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found in this category",
            });
        }

        res.status(200).json({
            success: true,
            message: `Jobs in category: ${category} retrieved successfully`,
            data: jobs,
        });
    } catch (error) {
        console.error("Error fetching jobs by category:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve jobs by category",
            error: error.message,
        });
    }
};


export const createJob = async (req, res) => {
    try {
        const { category, title, description, poster, price, images, location, status } = req.body;

        // Validate input fields
        if (!category || !title || !description || !poster || !price || !images || !location || !status) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Ensure images are stored in an array
        const imageArray = Array.isArray(images) ? images : [images];

        // Create a new job
        const newJob = new Job({
            category,
            title,
            description,
            poster,
            price,
            images: imageArray, // Store Base64 images
            location,
            status,
        });

        const savedJob = await newJob.save();

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            data: savedJob,
        });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ success: false, message: "Failed to create job", error: error.message });
    }
};


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
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){//checks if the id is valid and sends error job not found if not
        return res.status(404).json({success: false, message: 'Job not found'});
    }
    try{//find the job with the id and delete
        await Job.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Job deleted successfully'});
    }
    catch(error){//if there is an error, report
        console.log("Error deleting Job:", error.message);
        res.status(500).json({success: false, message: 'Server Error'});
    }
}