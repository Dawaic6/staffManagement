import React from "react";
import { useNavigate } from "react-router-dom";
import braLogo from "../assets/image.png"; // Adjust the path as necessary
import shdrLogo from "../assets/image.png"; // Adjust the path as necessary

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      {/* Logos and Welcome Words in a Row */}
      <div className="flex flex-row items-center justify-center gap-8 mb-12">
        <img src={shdrLogo} alt="SHDR Logo" className="h-24 drop-shadow-2xl" />
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-300 text-transparent bg-clip-text drop-shadow-lg">
            Welcome to
            <br />
            SHDR & BRA Staff Management System
          </h2>
        </div>
        <img src={braLogo} alt="BRA Logo" className="h-24 drop-shadow-2xl" />
      </div>

      {/* Missions and Visions */}
      <div className="flex flex-col items-center gap-8 flex-1">
        {/* SHDR Mission & Vision */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xl transform hover:scale-105 transition duration-300 perspective-1000">
          <div className="text-xl font-semibold text-blue-700 mb-2 text-center">SHDR Mission</div>
          <p className="text-gray-700 mb-2 text-center">
            To empower staff with innovative digital tools, fostering a culture of efficiency and collaboration.
          </p>
          <div className="text-lg font-medium text-blue-500 mb-1 text-center">SHDR Vision</div>
          <p className="text-gray-600 text-center">
            To be the leading organization in staff management excellence.
          </p>
          <div className="text-xs text-gray-400 mt-2 text-center">Version 1.0.0</div>
        </div>

        {/* BRA Mission & Vision */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xl transform hover:scale-105 transition duration-300 perspective-1000">
          <div className="text-xl font-semibold text-green-700 mb-2 text-center">BRA Mission</div>
          <p className="text-gray-700 mb-2 text-center">
            To streamline operations and promote organizational growth through digital transformation.
          </p>
          <div className="text-lg font-medium text-green-500 mb-1 text-center">BRA Vision</div>
          <p className="text-gray-600 text-center">
            To set the standard for research and administration in the digital era.
          </p>
          <div className="text-xs text-gray-400 mt-2 text-center">Version 1.0.0</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 w-64 mx-auto mt-12">
        <button
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg w-1/2 shadow-lg hover:bg-blue-700 transition"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
        <button
          className="border-2 border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded-lg w-1/2 shadow-lg hover:bg-blue-50 transition"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;