"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddDetails = () => {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [ownershipImage, setOwnershipImage] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">General Profile Information</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <div className="mx-auto text-3xl text-gray-400 mb-2">
                    <FaCloudUploadAlt />
                  </div>
                  <p className="text-sm mb-2">Upload Profile Picture</p>
                  <label
                    htmlFor="profile-picture"
                    className="cursor-pointer text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
                  >
                    Choose File
                  </label>
                  <input
                    type="file"
                    id="profile-picture"
                    className="hidden"
                    accept="image/*"
                    onChange={e => handleFileUpload(e, setProfilePicture)}
                  />
                  {profilePicture && <p className="mt-2 text-sm text-gray-600">{profilePicture.name}</p>}
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <div className="mx-auto text-3xl text-gray-400 mb-2">
                    <FaCloudUploadAlt />
                  </div>
                  <p className="text-sm mb-2">Upload Property Ownership Image</p>
                  <label
                    htmlFor="ownership-image"
                    className="cursor-pointer px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
                  >
                    Choose File
                  </label>
                  <input
                    type="file"
                    id="ownership-image"
                    className="hidden"
                    accept="image/*"
                    onChange={e => handleFileUpload(e, setOwnershipImage)}
                  />
                  {ownershipImage && <p className="mt-2 text-sm text-gray-600">{ownershipImage.name}</p>}
                </div>
              </div>
            </form>
          </div>

          <div className="rounded-lg p-4 mb-8">
            <div className="flex items-center"></div>

            <div className="flex justify-center">
              <button className="bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600 transition-colors text-lg font-semibold">
                Finish
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddDetails;
