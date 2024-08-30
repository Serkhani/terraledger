"use client";

import React, { useEffect, useState } from "react";
import { BrowserProviderContractRunner } from "@circles-sdk/adapter-ethers";
import { CirclesConfig, Sdk } from "@circles-sdk/sdk";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import Navbar from "~~/components/Navbar";

interface InfoItemProps {
  label: string;
  value: string;
}

const SingleLandDetails = () => {
  const [isProfileBlurred, setIsProfileBlurred] = useState(true);
  const [isTrustEstablished, setIsTrustEstablished] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [sdk, setSdk] = useState<Sdk | null>(null);
  const [adapterAddress, setAdapterAddress] = useState<string | null>(null);

  useEffect(() => {
    initializeSdk();
  }, []);

  const initializeSdk = async () => {
    try {
      const config: CirclesConfig = {
        circlesRpcUrl: "https://chiado-rpc.aboutcircles.com",
        pathfinderUrl: "https://chiado-pathfinder.aboutcircles.com",
        v2PathfinderUrl: "https://chiado-pathfinder.aboutcircles.com/pathfinder/",
        profileServiceUrl: "https://chiado-pathfinder.aboutcircles.com/profiles/",
        v1HubAddress: "0xdbf22d4e8962db3b2f1d9ff55be728a887e47710",
        v2HubAddress: "0xEddc960D3c78692BF38577054cb0a35114AE35e0",
        migrationAddress: "0x8C9BeAccb6b7DBd3AeffB5D77cab36b62Fe98882",
        nameRegistryAddress: "0x5525cbF9ad01a4E805ed1b40723D6377b336eCcf",
      };

      // Initialize the adapter
      const adapter = new BrowserProviderContractRunner();
      await adapter.init();

      // Check if adapter has a valid address, else use a mock address for demo
      const address = adapter.address || "0x336Cb7ac4e8A81Bc6532ED1c1Bb9FB0f489a1102";
      if (!address) {
        console.warn("Using mock address for demonstration purposes.");
      }
      
      setAdapterAddress(address);

      // Initialize SDK with the adapter
      const newSdk = new Sdk(config, adapter);
      setSdk(newSdk);
    } catch (error) {
      console.error("Failed to initialize SDK:", error);
    }
  };

const handleViewProfile = async () => {
  if (!sdk || !adapterAddress) {
    console.error("SDK or adapter address not initialized");
    return;
  }

  try {
    // Check if the address has an avatar
    const hasAvatar = await sdk.hasAvatar(adapterAddress);
    if (!hasAvatar) {
      console.log("Address is not registered with an avatar, signing up...");
      await sdk.signup(adapterAddress);  // Sign up the address to create an avatar
    }

    // Now get the avatar
    const avatar = await sdk.getAvatar(adapterAddress);
    if (!avatar) {
      console.error("Avatar not found after signup");
      return;
    }

    const advertiserAddress = "0xB89513e64a043Fd2F497013E74e1373c68b787d7";
    await avatar.trust(advertiserAddress);

    setIsProfileBlurred(false);
    setIsTrustEstablished(true);
  } catch (error) {
    console.error("Error establishing trust:", error);
  }
};


  const handleSendMessage = () => {
    setIsMessageDialogOpen(true);
  };

  const handleBuyLand = () => {
    // Implement land purchase logic here
    console.log("Buy land clicked");
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
                      <img src="/assets/user-icon.svg" alt="User Icon" />
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
                    {isTrustEstablished && (
                      <button
                        onClick={handleSendMessage}
                        className="w-full border border-blue-300 hover:bg-blue-50 text-blue-800 py-3 rounded-lg flex items-center justify-center"
                      >
                        <FaEnvelope /> Send Message
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Land Details */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Land Details</h2>
              <p className="mb-4">
                This beautiful piece of land is located in Amasaman, a rapidly developing area with great potential for
                both residential and commercial use.
              </p>
              <button
                onClick={handleBuyLand}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Buy Land
              </button>
            </div>
          </div>

          {/* General Information */}
          <div className="mt-12">
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

      {/* Message Dialog */}
      {isMessageDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Send Message to Advertiser</h3>
            <textarea
              className="w-full h-32 p-2 border rounded mb-4"
              placeholder="Type your message here..."
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={() => setIsMessageDialogOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsMessageDialogOpen(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value }: InfoItemProps) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
    <h4 className="text-lg font-semibold text-gray-700 mb-2">{label}</h4>
    <p className="text-gray-600">{value}</p>
  </div>
);

export default SingleLandDetails;
