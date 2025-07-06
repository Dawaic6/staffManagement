import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const departments = [
  { value: "", label: "Select a department" },
  { value: "SDHR", label: "SDHR" },
  { value: "BRA", label: "BRA" },
];

const statuses = [
  { value: "", label: "Select status" },
  { value: "Researcher", label: "Researcher" },
  { value: "Employee", label: "Employeee" },
];

const SignUpPage: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    department: "",
    role: "user", // Default to user
    status: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("https://staffmanagement-bn.onrender.com/api/register", form);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-gray-50 py-5
    ">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md ">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Staff Registration</h1>
        <p className="text-gray-500 mb-6 text-center">Create your account to access the staff management system</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="font-medium">First Name</label>
          <input
            name="firstName"
            placeholder="Enter your first name"
            className="p-3 rounded-lg border border-gray-300"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <label className="font-medium">Last Name</label>
          <input
            name="lastName"
            placeholder="Enter your last name"
            className="p-3 rounded-lg border border-gray-300"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <label className="font-medium">Title</label>
          <input
            name="title"
            placeholder="e.g. biologist, site engineer, etc. "
            className="p-3 rounded-lg border border-gray-300"
            value={form.title}
            onChange={handleChange}
            required
          />
          <label className="font-medium">Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email address"
            className="p-3 rounded-lg border border-gray-300"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label className="font-medium">Department</label>
          <select
            name="department"
            className="p-3 rounded-lg border border-gray-300"
            value={form.department}
            onChange={handleChange}
            required
          >
            {departments.map(dep => (
              <option key={dep.value} value={dep.value}>{dep.label}</option>
            ))}
          </select>
          <label className="font-medium">Status</label>
          <select
            name="status"
            className="p-3 rounded-lg border border-gray-300"
            value={form.status}
            onChange={handleChange}
            required
          >
            {statuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
          <label className="font-medium">Role</label>
          <input
            name="role"
            value="User"
            className="p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
            disabled
            readOnly
          />
          <label className="font-medium">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="p-3 rounded-lg border border-gray-300"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg mt-2"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;