import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const nevigate = useNavigate();

    const handleSignin = async () => {
        try {
            const response = await fetch("https://amar-savings-loan.onrender.com/api/users/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, password }),
            });
            const data = await response.json();
            if (response.ok) {
                // alert("Signin successful!");
                localStorage.setItem("userId", data.userId);
                setUserId("");
                setPassword("");
                nevigate("/"); 
                window.location.reload();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error signing in", error);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Signin</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSignin(); }}>
                <div className="space-y-4 mb-5">
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Signin
                </button>
                </form>
            <p className="mt-5">have not an account yet! <Link to={`/signup`} className="text-blue-500 underline">Register here</Link></p>
            </div>
        </div>
    );
 
};

export default Signin;
