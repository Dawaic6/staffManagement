import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image.png"; 

interface DashboardLayoutProps {
  user: {
    name: string;
    status: string;
    role: string;
    department: string;
  };
  children: React.ReactNode;
}

const menuItems = [
  { label: "Dashboard", icon: "📊", path: "/dashboard/cro" },
  { label: "Staff", icon: "👥", path: "/dashboard/staff" },
  { label: "Attendance", icon: "🗓️" },
  { label: "Leaves", icon: "🌿" },
  { label: "Tasks", icon: "✅" },
  { label: "Uploads", icon: "⬆️", path: "/dashboard/employee" },
  { label: "Logout", icon: "🚪", path: "/logout" }
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, children }) => (
  <div className="min-h-screen flex bg-gray-50">
    {/* Sidebar */}
    <aside className="w-64 bg-blue-600 text-white flex flex-col py-6 px-4 rounded-r-3xl">
      
      <div className="mb-8 flex items-center gap-2 text-white font-bold text-xl">
       
        <img src={logo} alt="Company Logo" className="w-14 h-14 rounded-full" />
        <span>Brilliant Researchers <br /> Africa</span>
      </div>

      <nav className="flex-1">
        {menuItems.map(item => (
          <Link
            key={item.label}
            to={item.path ?? "#"}
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-700 transition mb-1"
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-2 text-sm opacity-80">
        <span>⚙️</span> Settings
      </div>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">{user.role}</span>
        </div>
      </header>
      {children}
    </main>
  </div>
);

export default DashboardLayout;
