import React from 'react';
import { PlaceHolderImage } from "../assets/PlaceHolderImages";

const JobCard = ({ category, title, location, price }) => {
  return (
    <div className="px-4 py-3 max-w-xs rounded-xl shadow-lg m-2">
        <h2 className="font-montserrat font-bold text-stone-950 text-xl mb-2">{title}</h2>
        <img className="w-full" src={PlaceHolderImage} alt="Job" />
        <p className="text-slate-gray font-montserrat text-base mt-4">{location}</p>
        <div className="flex justify-between items-center mt-2">
            <p className="text-green-600 font-montserrat">Pay: ${price}</p>
            <button className="bg-green-600 font-montserrat text-white px-4 py-2 rounded">Info</button>
        </div>
    </div>
  );
};

export default JobCard;