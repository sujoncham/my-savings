import { useState } from "react";

const Signup = ({setIsModalOpen1}) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            const response = await fetch("https://amar-savings-loan.onrender.com/api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password }),
            });
            const data = await response.json();
            if (response.ok) {
                // alert(`Signup successful! Your User ID is: ${data.userId}`);
                setName("");
                setPassword("");
                setIsModalOpen1(false); 
                window.location.reload()
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error signing up", error);
        }
    };
    return (
        // <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                    <div className="flex gap-4">
                    <button
                    onClick={() => setIsModalOpen1(false)}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Close
                </button>
                    <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    create user
                </button>
                </div>
                </form>
            {/* <p className="mt-5">have an account! <Link to={`/signin`} className="text-blue-500 underline">Login 
            here</Link></p> */}
            </div>
        </div>
    );
   
};

export default Signup;
