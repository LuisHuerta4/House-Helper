import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';

const ProfilePage = () => {

    const [userData, setUserData] = useState(null);
    const [completedJobs, setCompletedJobs] = useState([]);
    const [postedJobs, setPostedJobs] = useState([]);
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
  
    if (!userData) {
      return <div>Loading...</div>;
    }

    return (
      <div className="max-w-4xl mx-auto p-6 mt-6 bg-[#fff6e7] shadow-lg rounded-lg">
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
                category={job.category} 
                title={job.title} 
                location={job.location} 
                price={job.price} 
                images={job.images} 
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

export default ProfilePage;