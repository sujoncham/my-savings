import { useState } from "react";
import { signup } from "../redux/features/authSlice";
import { useDispatch } from "react-redux";

const Signup = ({ setIsModalOpen1 }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // Default role is "user"
    const dispatch = useDispatch();

    const handleSignup = async () => {
        await dispatch(signup({ name, password, role }))
        setName("");
        setPassword("");
        setRole("user"); // Reset role to default
        setIsModalOpen1(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Create User</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                        required
                    />
                    {/* Role Selection Dropdown */}
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsModalOpen1(false)}
                            className="w-full bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
