"use client";

import React, { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import Navbar from "~~/components/Navbar";

interface InfoItemProps {
  label: string;
  value: string;
}

const SingleLandDetails = () => {
  const [isProfileBlurred, setIsProfileBlurred] = useState(true);

  const handleViewProfile = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsProfileBlurred(false);
    } catch (error) {
      console.error("Error requesting trust:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Amasaman Land for Sale</h1>
            <span className="text-4xl font-bold text-red-600">125 $</span>
          </div>

          {/* Image Gallery */}
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-4">
              <img src="/assets/land-3.jpg" alt="Land view 1" className="w-64 h-40 object-cover rounded-lg" />
              <img src="/assets/land-4.jpg" alt="Land view 2" className="w-64 h-40 object-cover rounded-lg" />
              <img src="/assets/land-3.jpg" alt="Land view 3" className="w-64 h-40 object-cover rounded-lg" />
              <img src="/assets/land-4.jpg" alt="Land view 4" className="w-64 h-40 object-cover rounded-lg" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Advertiser Info */}
            <div className="lg:w-1/3 mb-12">
              <div className="p-6 rounded-lg shadow-md">
                <div className={`transition-all duration-300 ${isProfileBlurred ? "filter blur-md" : ""}`}>
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16">
                      <img src="/assets/user-icon.svg" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-bold text-black">Michael James</h3>
                      <p className="text-gray-600">Real Estate Specialist</p>
                    </div>
                  </div>
                </div>
                {isProfileBlurred ? (
                  <button
                    onClick={handleViewProfile}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition duration-300 flex items-center justify-center"
                  >
                    <FaPhone /> View Profile
                  </button>
                ) : (
                  <>
                    <button className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-lg mb-2 flex items-center justify-center">
                      <FaPhone /> View Phone
                    </button>
                    <button className="w-full border border-blue-300 hover:bg-blue-50 text-blue-800 py-3 rounded-lg flex items-center justify-center">
                      <FaEnvelope /> Send Message
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* General Information */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-black mb-6">General Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoItem label="Advertise No" value="0-1234" />
              <InfoItem label="Published Date" value="20 November 2020" />
              <InfoItem label="Advertise Status" value="Daily Rental" />
              <InfoItem label="Land Shape" value="Rectangular" />
              <InfoItem label="Room + Living Number" value="1 + 1" />
              <InfoItem label="Front" value="Northwest" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="p-4 rounded-lg shadow-sm">
    <p className="font-semibold text-black">{label}:</p>
    <p className="text-black">{value}</p>
  </div>
);

export default SingleLandDetails;
