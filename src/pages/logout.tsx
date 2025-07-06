import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token and other session data
    localStorage.removeItem("token");
    // Add more items to clear if needed
    // localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return <p>Logging out...</p>; // Optional message before redirect
};

export default LogoutPage;
