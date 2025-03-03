"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CreateJobPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    status: "Open",
    images: [],
  })
  const [imageFiles, setImageFiles] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setImageFiles((prev) => [...prev, ...newFiles]);
  
      // Convert images to Base64
      Promise.all(newFiles.map(fileToBase64)).then((base64Images) => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...base64Images],
        }));
      });
  
      // Create preview URLs
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
  
    setIsLoading(true);
  
    try {
      const jobData = {
        ...formData,
        poster: "user-id",  // TODO: Replace with actual user ID when authentication is added
      };
  
      console.log("Sending job data to API:", jobData);
  
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });
  
      console.log("API response:", response);
  
      if (!response.ok) {
        throw new Error("Failed to create job");
      }
  
      const responseData = await response.json();
      console.log("Job created successfully:", responseData);      
      navigate("/"); // Navigate back to the homepage
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="container max-w-3xl py-10">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold mb-6">Job Creation Page</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-6">New Job Posting</h2>
              </div>

              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                    Pay
                  </label>
                  <input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select a category</option>
                    <option value="Pools">Pools</option>
                    <option value="Foliage">Foliage</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Pets">Pets</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                  Location
                </label>
                <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Images</label>
                <div className="grid grid-cols-3 gap-4">
                  {[0, 1, 2].map((index) => (
                      <div key={index} className="aspect-video relative border rounded-lg overflow-hidden">
                        {previewUrls[index] ? (
                            <img
                                src={previewUrls[index] || "/placeholder.svg"}
                                alt={`Preview ${index + 1}`}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <label
                                htmlFor={`image-${index}`}
                                className="flex items-center justify-center w-full h-full bg-gray-200 cursor-pointer"
                            >
                              <span className="text-gray-500">+</span>
                              <input
                                  type="file"
                                  id={`image-${index}`}
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  className="hidden"
                              />
                            </label>
                        )}
                      </div>
                  ))}
                </div>
              </div>

              <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Posting"}
              </button>
            </form>
          </div>
        </div>
      </div>
  )
}
