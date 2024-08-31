"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaCloudUploadAlt } from "react-icons/fa";

const AdvertiseLand = () => {
  const router = useRouter();
  const [photos, setPhotos] = useState<File[]>([]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhotos(Array.from(event.target.files));
    }
  };

  const handleNext = () => {
    router.push("/add-details");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Advertise Your Land</h1>

          <div className="rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">General Land Information</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  className="w-full px-3 py-2 border border-gray-300 bg-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="area" className="block text-sm font-medium mb-1">
                  Area *
                </label>
                <input
                  type="number"
                  id="area"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  required
                />
              </div>
            </form>
          </div>

          <div className="rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Posting Photos</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FaCloudUploadAlt />
              <p className="mb-4">You can add 30 photos to your ad</p>
              <label
                htmlFor="photo-upload"
                className="cursor-pointer bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Upload From Computer
              </label>
              <input
                type="file"
                id="photo-upload"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </div>
            {photos.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              className="bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600 transition-colors text-lg font-semibold"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdvertiseLand;
