import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./pages/welcomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/signUpPage";
import DashboardLayout from "./components/dashboard";
import AdminDashboard from "./pages/admin/dashboard";
import UserDashboard from "./pages/user/dashboard";
import StaffDashboard from "./pages/admin/staffDashboard";
import LogoutPage from "./pages/logout";

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN IN PROTECTED ROUTE:", token); // Debugging token value

  return token ? children : <Navigate to="/login" replace />;
};

// Simulated mock user (replace with real auth later)
const mockUser = {
  name: "Admin",
  status: "Researcher",
  role: "admin",
  department: "BRA",
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/logout" element={<LogoutPage />} />

        {/* Protected Routes */}

        {/* Admin CRO (BRA) */}
        <Route
          path="/dashboard/cro"
          element={
            <ProtectedRoute>
              <DashboardLayout user={mockUser}>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Staff */}
        <Route
          path="/dashboard/staff"
          element={
            <ProtectedRoute>
              <DashboardLayout user={mockUser}>
                <StaffDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* User (BRA) */}
        <Route
          path="/dashboard/researcher"
          element={
            <ProtectedRoute>
              <DashboardLayout user={{ ...mockUser, role: "user" }}>
                <UserDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin CEO/HR (SDHR) */}
        <Route
          path="/dashboard/ceo"
          element={
            <ProtectedRoute>
              <DashboardLayout user={{ ...mockUser, name: "CEO", department: "SDHR" }}>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* User (SDHR) */}
        <Route
          path="/dashboard/employee"
          element={
            <ProtectedRoute>
              <DashboardLayout user={{ ...mockUser, role: "user", department: "SDHR" }}>
                <UserDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all route for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
