import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';

const ProfilePage = () => {

    const [userData, setUserData] = useState(null);
    const [completedJobs, setCompletedJobs] = useState([]);
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
  
          // Fetch job details for each listing
          const jobDetails = await Promise.all(
            data.data.listings.map(async (jobId) => {
              const jobResponse = await fetch(`/api/jobs/${jobId}`);
              if (!jobResponse.ok) {
                throw new Error('Failed to fetch job data');
              }
              const jobData = await jobResponse.json();
              return jobData.data;
            })
          );
          setCompletedJobs(jobDetails);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, [userId]);
  
    if (!userData) {
      return <div>Loading...</div>;
    }

    return (
      <div className="max-w-4xl mx-auto p-6 mt-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image & Name */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
              <img src={userData.icon} alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="mt-2 bg-gray-300 px-4 py-2 w-full text-center">{userData.name}</div>
          </div>
          
          {/* About Section */}
          <div className="flex-1 space-y-2">
            <div className="bg-gray-300 px-4 py-2 text-center">About Me</div>
            <div className="bg-gray-300 p-4 h-32">{userData.bio}</div>
          </div>
        </div>
        
        {/* Completed Jobs Section */}
        <div className="mt-8">
          <div className="bg-gray-300 px-4 py-2 text-center">Completed Jobs</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {completedJobs.map((job) => (
              <JobCard 
                key={job._id} 
                category={job.category} 
                title={job.title} 
                location={job.location} 
                price={job.price} 
                images={job.images} 
              />
            ))}
          </div>
        </div>
      </div>
    );
}

export default ProfilePage