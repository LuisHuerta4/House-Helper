import React from 'react';
import { Link } from "react-router-dom";
import { PlaceHolderImage } from "../assets/PlaceHolderImages";
import { trashcan } from "../assets/icons";

const JobCard = ({ id, category, title, location, price, images, onDelete, onMarkAsDone }) => {
  const imageUrl = images && images.length > 0 ? images[0] : PlaceHolderImage;

  return (
    <div className="px-4 bg-white py-3 max-w-xs rounded-xl shadow-lg m-2 transform transition-transform duration-300 hover:scale-105">
        <h2 className="font-montserrat font-bold text-neutral-900 text-xl mb-2 h-12 overflow-hidden">{title}</h2>
        <img className="w-full h-48 object-cover rounded-lg" src={imageUrl} alt="Job" />
        <p className="text-slate-gray font-montserrat text-base mt-4">{location}</p>
        <div className="flex justify-between items-center mt-2">
            <p className="text-green-600 font-montserrat">Pay: ${price}</p>
            <div className="flex space-x-2">
              <Link to={`/jobInfo/${id}`}>
                <button className="bg-green-600 font-montserrat text-white px-3 py-2 rounded hover:bg-green-700">Info</button>
              </Link>
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="bg-red-500 text-white px-3 py-2.5 rounded flex items-center justify-center hover:bg-red-700"
                >
                  <img src={trashcan} alt="Delete" className="w-5 h-5" />
                </button>
              )}
              {onMarkAsDone && (
                <button
                  onClick={onMarkAsDone}
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700"
                >
                  Done
                </button>
              )}
            </div>
        </div>
    </div>
  );
};

export default JobCard;