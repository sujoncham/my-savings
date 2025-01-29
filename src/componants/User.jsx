import axios from "axios";
import { useEffect, useState } from "react";
import Signup from "../pages/Signup";

const User = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://amar-savings-loan.onrender.com/api/users");
        setUsers(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getData();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditedName(user.name);
    setIsModalOpen(true);
  };

    const handleDeleteClick = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            const getData = async () => {
                await axios
                    .delete(`https://amar-savings-loan.onrender.com/api/users/${id}`)
                    .then(() => {
                        console.log("deleted");
                        window.location.reload()
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            };
            getData();
        };
    }
    


  const handleModalSave = async () => {
    try {
        const updatedUser = { name: editedName }; // Only send updated fields
        const response = await axios.put(`https://amar-savings-loan.onrender.com/api/users/${selectedUser._id}`, updatedUser);
        if (response.status === 200) {
            // Update the state with the new data
            setUsers(users.map((user) => (user._id === selectedUser._id ? { ...user, name: editedName } : user)));
            setIsModalOpen(false);
            setSelectedUser(null);
        } else {
            console.error("Failed to update user:", response.data);
        }
    } catch (err) {
        console.error("Error updating user:", err.message);
    }
    };
    
    

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="flex justify-between items-center py-5">
          <h1 className="text-3xl font-bold text-center">User List</h1>
          <button
                onClick={() => setIsModalOpen1(!isModalOpen1)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
              >
                create user
              </button>
        </div>
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">UserId</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-6">{index + 1}</td>
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.userId}</td>
              <td className="py-3 px-6">
                <button
                  onClick={() => handleEditClick(user)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
          )}
          
          {isModalOpen1 && <Signup setIsModalOpen1={setIsModalOpen1} />}
    </div>
  );
};

export default User;
