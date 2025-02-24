"use client"

import { useState } from "react"

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setImageFiles((prev) => [...prev, ...newFiles])

      // Create preview URLs
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    setIsLoading(true);

    try {
      const uploadedImageUrls = imageFiles.map((file) => URL.createObjectURL(file));

      const jobData = {
        ...formData,
        images: uploadedImageUrls,
        poster: "user-id",  //todo might be needed if we have login later on.
      };

      console.log("Sending job data to API:", jobData);

      const response = await fetch("/api/jobs", {  // Adjust URL if needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      })

      console.log("API response:", response); // Log the response

      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      const responseData = await response.json();
      console.log("Job created successfully:", responseData);
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <p>SUCCESS</p>
  )
}
