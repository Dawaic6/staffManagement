import React from "react";

const UserDashboard: React.FC = () => (
  <div>
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
    {/* Upload Report */}
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <div className="font-semibold mb-2">Upload Report</div>
      <input type="file" className="block mb-2" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
    </div>
  </div>
);

export default UserDashboard;