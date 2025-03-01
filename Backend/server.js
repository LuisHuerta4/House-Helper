import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import jobRoutes from './routes/job.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json()); // to parse json data

app.use("/api/jobs", jobRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running at http://localhost:' + PORT);
});