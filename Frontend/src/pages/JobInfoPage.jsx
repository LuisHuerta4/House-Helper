import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { chevronLeft } from '../assets/icons';
import axios from 'axios';

const JobInfoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/jobs/${id}`);
        setJob(response.data.data);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center pb-32 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <button 
            onClick={() => navigate('/')} 
            className="px-2 py-2 rounded-full"
        >
            <img src={chevronLeft} alt="Left Arrow" className="w-9 h-9" />
        </button>
        <h1 className="text-3xl font-bold text-center mb-4">{job.title}</h1>
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {job.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Job Image ${index + 1}`}
              className="w-64 h-64 object-cover rounded-lg transform transition-transform duration-300 hover:scale-110"
            />
          ))}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="font-montserrat text-lg">{job.description}</p>
        </div>
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4">
          <p className="font-montserrat text-lg font-semibold">Location: {job.location}</p>
          <p className="font-montserrat text-lg font-semibold text-green-600">Pay: ${job.price}</p>
        </div>
        <button className="font-montserrat mt-4 bg-green-600 text-white px-6 py-2 w-full rounded-lg hover:bg-green-700">Take Job</button>
      </div>
    </div>
  );
};

export default JobInfoPage;