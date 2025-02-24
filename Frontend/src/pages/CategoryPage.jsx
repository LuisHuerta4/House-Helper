import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CategoryPage() {
    const { categoryName } = useParams();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`/api/jobs/category/${encodeURIComponent(categoryName)}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("API response:", data);
                setJobs(Array.isArray(data.data) ? data.data : []);
            })
            .catch((err) => console.error("Error fetching jobs:", err));
    }, [categoryName]);
    

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">{categoryName} Jobs</h1>
    
            {jobs.length === 0 ? (
                <p>No jobs found in this category.</p>
            ) : (
                <ul>
                    {jobs.map((job) => (
                        <li key={job._id} className="border p-4 my-2">
                            <h2 className="text-xl">{job.title}</h2>
                            <p>{job.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CategoryPage;