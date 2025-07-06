import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

interface User {
  role: string;
  department: string;
  title?: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    const res = await axios.post("https://staffmanagement-bn.onrender.com/api/login", {
      email,
      password,
    });

    const data = res.data as { user: User; token: string };
    const user: User = data.user;

    localStorage.setItem("token", data.token); // ✅ Save token

    // Now redirect based on role and department
    if (user.role === "admin" && user.department === "SDHR") {
      navigate("/dashboard/ceo");
    } else if (user.role === "admin" && user.department === "BRA") {
      navigate("/dashboard/cro");
    } else if (user.role === "user" && user.department === "BRA") {
      navigate("/dashboard/researcher");
    } else if (user.role === "user" && user.department === "SDHR") {
      navigate("/dashboard/employee");
    } else {
      navigate("/dashboard");
    }

  } catch (err: any) {
    setError(err.response?.data?.message || "Invalid credentials");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Log In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="font-medium">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="p-3 rounded-lg border border-gray-300"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label className="font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="p-3 rounded-lg border border-gray-300"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg mt-2"
          >
            Log in
          </button>
        </form>
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;