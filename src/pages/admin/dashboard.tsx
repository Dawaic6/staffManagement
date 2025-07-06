import React from "react";

const AdminDashboard: React.FC = () => (
  <div>
    {/* Stats */}
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
        <span className="text-blue-600 text-2xl mb-2">👥</span>
        <div className="text-3xl font-bold">50</div>
        <div className="text-gray-500">Total Staff</div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
        <span className="text-blue-600 text-2xl mb-2">🟢</span>
        <div className="text-3xl font-bold">45</div>
        <div className="text-gray-500">Active Today</div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
        <span className="text-green-600 text-2xl mb-2">🌿</span>
        <div className="text-3xl font-bold">3</div>
        <div className="text-gray-500">Pending Leaves</div>
      </div>
    </div>
    {/* Charts (placeholder) */}
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold mb-2">Attendance Overview</div>
        <div className="h-32 bg-blue-100 rounded"></div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold mb-2">Leave & Performance Trends</div>
        <div className="h-32 bg-green-100 rounded"></div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;