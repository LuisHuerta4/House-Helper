import express from 'express';
import { getAllJobs, createJob, deleteJob, updateJob, getJobsByCategory } from '../controllers/job.controller.js';

const router = express.Router();

router.get('/', getAllJobs)
router.get("/category/:category", getJobsByCategory);
router.post('/', createJob)
router.put("/:id", updateJob)
router.delete("/:id", deleteJob)

export default router;