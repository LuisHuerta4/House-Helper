import { Header } from "../assets/HomeImages";
import {Link} from "react-router-dom";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${Header})`,
      }}
      className="bg-cover bg-top bg-no-repeat text-white min-h-screen w-full flex items-center justify-center"
    >
      <div className="bg-black bg-opacity-50 w-full h-full p-20 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to House Helper
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Start helping others with at home activities
          </p>
          <div className="flex justify-center gap-2">
            <button className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg shadow-lg font-semibold">
              Browse Categories
            </button>
            <Link to={"/create"}>
              <button className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg shadow-lg font-semibold">
                Make Post
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
