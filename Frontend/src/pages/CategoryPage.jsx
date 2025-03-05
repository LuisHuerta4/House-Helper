import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { FurnitureHero, PoolsHero, PetsHero, FoliageHero } from '../assets/CategoryHeroes';

function CategoryPage() {
    const { categoryName } = useParams();
    const [jobs, setJobs] = useState([]);

    const getCategoryHero = (category) => {
        switch (category.toLowerCase()) {
            case 'foliage':
                return FoliageHero;
            case 'pools':
                return PoolsHero;
            case 'pets':
                return PetsHero;
            case 'furniture':
                return FurnitureHero;
            default:
                return null;
        }
    };

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
        <div className="p-6 flex flex-col items-center">
            <nav className="flex-1 flex justify-center items-center gap-16 mb-3">
                <Link to="/" className="font-montserrat leading-normal text-lg text-slate-gray">Home</Link>
                <Link to="/profile" className="font-montserrat leading-normal text-lg text-slate-gray">Profile</Link>
            </nav>
            <div className="relative w-full max-w-7xl">
                <img src={getCategoryHero(categoryName)} alt={`${categoryName} Hero`} className="w-full h-80 object-cover rounded-3xl" />
                <h1 className="font-montserrat absolute inset-0 flex items-center justify-center text-4xl font-bold text-white bg-black bg-opacity-20 rounded-3xl">{categoryName} Jobs</h1>
            </div>
    
            {jobs.length === 0 ? (
                <p className="mt-4">No jobs found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {jobs.map((job) => (
                        <JobCard 
                            key={job._id} 
                            id={job._id}
                            category={categoryName} 
                            title={job.title} 
                            description={job.description} 
                            price={job.price} 
                            location={job.location}
                            images={job.images}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryPage;