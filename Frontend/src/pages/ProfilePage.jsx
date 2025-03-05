import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { chevronLeft } from '../assets/icons';
import { ProfileBackground } from '../assets/PlaceHolderImages';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);
  const [inProgressJobs, setInProgressJobs] = useState([]);
  const userId = "67c55279958b5f04cfd625a1"; // Replace with actual user ID
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data.data);
  
        // Fetch job details for each job completed
        const jobDetails = await Promise.all(
          data.data.completed.map(async (jobId) => {
            const jobResponse = await fetch(`/api/jobs/${jobId}`);
            if (!jobResponse.ok) {
              throw new Error('Failed to fetch job data');
            }
            const jobData = await jobResponse.json();
            return jobData.data;
          })
        );
        setCompletedJobs(jobDetails);

        // Fetch job details for each job in progress
        const inProgressJobDetails = await Promise.all(
          data.data.progress.map(async (jobId) => {
            const jobResponse = await fetch(`/api/jobs/${jobId}`);
            if (!jobResponse.ok) {
              throw new Error('Failed to fetch job data');
            }
            const jobData = await jobResponse.json();
            return jobData.data;
          })
        );
        setInProgressJobs(inProgressJobDetails);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    const fetchPostedJobs = async () => {
      try {
        const response = await fetch(`/api/jobs`);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        const userPostedJobs = data.data.filter(job => job.poster === userId);
        setPostedJobs(userPostedJobs);
      } catch (error) {
        console.error('Error fetching posted jobs:', error);
      }
    };
  
    fetchUserData();
    fetchPostedJobs();
  }, [userId]);
  
  const handleDeleteJob = async (jobId) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete job');
      }
      setPostedJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleMarkJobAsDone = async (jobId) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Closed' }),
      });
      if (!response.ok) {
        throw new Error('Failed to mark job as done');
      }

      // Update user data
      const userResponse = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          $pull: { progress: jobId },
          $push: { completed: jobId },
        }),
      });
      if (!userResponse.ok) {
        throw new Error('Failed to update user data');
      }

      setInProgressJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      const completedJob = inProgressJobs.find((job) => job._id === jobId);
      setCompletedJobs((prevJobs) => [...prevJobs, completedJob]);
    } catch (error) {
      console.error('Error marking job as done:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-cover bg-center pt-7 min-h-screen" style={{ backgroundImage: `url(${ProfileBackground})` }}>
      <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg" style={{ backdropFilter: 'blur(30px)', background: 'rgba(255, 255, 255, 0.1)' }}>
        <button 
          onClick={() => navigate('/')} 
          className="px-2 py-2 rounded-full"
        >
          <img src={chevronLeft} alt="Left Arrow" className="w-9 h-9" />
        </button>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image & Name */}
          <div className="flex flex-col items-center mt-5">
            <div className="w-40 h-40 rounded-full flex items-center justify-center overflow-hidden">
              <img src={userData.icon} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="font-montserrat mt-2 px-4 py-2 w-full text-center rounded-md text-xl font-semibold">{userData.name}</div>
            <div className="font-montserrat mt-2 px-4 py-2 w-full text-center rounded-md text-lg font-semibold">
              Satisfaction Rate
              <div className="text-green-600">{userData.rating}%</div>
            </div>
          </div>
          
          {/* About Section */}
          <div className="flex-1 space-y-2">
            <div className="font-montserrat px-4 py-2 text-center rounded-md text-xl font-semibold">About Me</div>
            <div className="font-montserrat p-4 h-fit rounded-md overflow-auto">{userData.bio}</div>
          </div>
        </div>
        
        {/* Completed Jobs Section */}
        <div className="mt-8">
          <div className="font-montserrat px-4 py-2 text-center rounded-md text-xl font-semibold">Completed Jobs</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {completedJobs.map((job) => (
              <JobCard 
                key={job._id} 
                id={job._id}
                category={job.category} 
                title={job.title} 
                location={job.location} 
                price={job.price} 
                images={job.images} 
              />
            ))}
          </div>
        </div>

        {/* In Progress Jobs Section */}
        <div className="mt-8">
          <div className="font-montserrat px-4 py-2 text-center rounded-md text-xl font-semibold">In Progress Jobs</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {inProgressJobs.map((job) => (
              <JobCard 
                key={job._id} 
                id={job._id}
                category={job.category} 
                title={job.title} 
                location={job.location} 
                price={job.price} 
                images={job.images} 
                onMarkAsDone={() => handleMarkJobAsDone(job._id)}
              />
            ))}
          </div>
        </div>

        {/* Posted Jobs Section */}
        <div className="mt-8">
          <div className="font-montserrat px-4 py-2 text-center rounded-md text-xl font-semibold">Posted Jobs</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {postedJobs.map((job) => (
              <JobCard 
                key={job._id} 
                id={job._id}
                category={job.category} 
                title={job.title} 
                location={job.location} 
                price={job.price} 
                images={job.images} 
                onDelete={() => handleDeleteJob(job._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;