import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

interface IUser {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  department: "SDHR" | "BRA";
  title?: string;
  status?: "Researcher" | "Employee";
}

const StaffDashboard: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [newUser, setNewUser] = useState<Partial<IUser>>({});
  const [searchEmail, setSearchEmail] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users");
        const users = res.data as IUser[];

        if (Array.isArray(users)) {
          setUsers(users);
          setFilteredUsers(users);
        } else {
          setError("Invalid data format from server.");
        }
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesEmail = user.email.toLowerCase().includes(searchEmail.toLowerCase());
      const matchesRole = filterRole ? user.role === filterRole : true;
      return matchesEmail && matchesRole;
    });
    setFilteredUsers(filtered);
  }, [searchEmail, filterRole, users]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
      setMessage("User deleted successfully.");
    } catch (err) {
      console.error("Failed to delete user:", err);
      setError("Failed to delete user.");
    }
  };

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaveStatus({ loading: true, success: false, error: false, message: "Saving... Please wait" });
    // const user = editingUser || newUser;

    if (editingUser) {
      try {
        await axios.put(`http://localhost:8000/api/users/${editingUser._id}`, editingUser);
        const updatedUsers = users.map((u) =>
          u._id === editingUser._id ? { ...u, ...editingUser } : u
        );
        setUsers(updatedUsers);
        setMessage("User updated successfully.");
        setShowModal(false);
        setEditingUser(null);
        setSaveStatus({ loading: false, success: true, error: false, message: "User updated successfully." });
      } catch (err) {
        console.error("Failed to update user:", err);
        setError("Failed to update user.");
        setSaveStatus({ loading: false, success: false, error: true, message: "Failed to update user." });
      }
    } else {
      try {
        const res = await axios.post("http://localhost:8000/api/register", newUser);
        setUsers([...users, res.data as IUser]);
        setMessage("User registered successfully.");
        setShowModal(false);
        setNewUser({});
        setSaveStatus({ loading: false, success: true, error: false, message: "User registered successfully." });
      } catch (err: any) {
        console.error("Failed to create user:", err);
        setError(err.response?.data?.message || "Failed to register user.");
        setSaveStatus({ loading: false, success: false, error: true, message: "Failed to register user." });
      }
    }

    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 5000);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-4">User Management</h2>

      {message && <p className="text-green-600 text-center mb-4">{message}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/4"
        >
          <option value="">Filter by role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setNewUser({});
            setEditingUser(null);
            setShowModal(true);
          }}
        >
          + New User
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">First Name</th>
                <th className="border px-4 py-2">Last Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Department</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user._id}</td>
                  <td className="border px-4 py-2">{user.firstName}</td>
                  <td className="border px-4 py-2">{user.lastName}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">{user.department}</td>
                  <td className="border px-4 py-2">{user.title}</td>
                  <td className="border px-4 py-2">{user.status}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => handleEdit(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              {editingUser ? "Edit User" : "Add New User"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const errors: Record<string, string> = {};
                const user = editingUser || newUser;

                if (!user.firstName?.trim()) errors.firstName = "First name is required.";
                if (!user.lastName?.trim()) errors.lastName = "Last name is required.";
                if (!user.email?.trim()) {
                  errors.email = "Email is required.";
                } else if (!/\S+@\S+\.\S+/.test(user.email)) {
                  errors.email = "Invalid email address.";
                }
                if (!editingUser && !newUser.password?.trim()) {
                  errors.password = "Password is required.";
                }
                if (!user.role) errors.role = "Role is required.";
                if (!user.department) errors.department = "Department is required.";
                if (!user.status?.trim()) errors.status = "Status is required.";

                setFormErrors(errors);
                if (Object.keys(errors).length === 0) handleSave();
              }}
            >
              {/* Text Inputs */}
              {["firstName", "lastName", "email", "title"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    type="text"
                    value={
                      editingUser?.[field as keyof IUser] ||
                      newUser[field as keyof IUser] ||
                      ""
                    }
                    onChange={(e) =>
                      editingUser
                        ? setEditingUser({ ...editingUser, [field]: e.target.value })
                        : setNewUser({ ...newUser, [field]: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2 mb-1"
                  />
                  {formErrors[field] && <p className="text-red-500 text-sm mb-2">{formErrors[field]}</p>}
                </div>
              ))}

              {!editingUser && (
                <>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    value={newUser.password || ""}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full border rounded px-4 py-2 mb-1"
                  />
                  {formErrors.password && <p className="text-red-500 text-sm mb-2">{formErrors.password}</p>}
                </>
              )}

              {/* Select Inputs */}
              {[
                { label: "Role", name: "role", options: ["admin", "user"] },
                { label: "Department", name: "department", options: ["SDHR", "BRA"] },
                { label: "Status", name: "status", options: ["Researcher", "Employee"] },
              ].map(({ label, name, options }) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1">{label}</label>
                  <select
                    value={
                      (editingUser?.[name as keyof IUser] || newUser[name as keyof IUser]) || ""
                    }
                    onChange={(e) =>
                      editingUser
                        ? setEditingUser({ ...editingUser, [name]: e.target.value })
                        : setNewUser({ ...newUser, [name]: e.target.value })
                    }
                    className="w-full border rounded px-4 py-2 mb-1"
                  >
                    <option value="">Select {label}</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {formErrors[name] && <p className="text-red-500 text-sm mb-2">{formErrors[name]}</p>}
                </div>
              ))}

              {/* Save and Cancel Buttons */}
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </div>

              {/* Status Message */}
              {saveStatus.loading && <p className="text-blue-500 mt-2">{saveStatus.message}</p>}
              {saveStatus.success && <p className="text-green-500 mt-2">{saveStatus.message}</p>}
              {saveStatus.error && <p className="text-red-500 mt-2">{saveStatus.message}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
