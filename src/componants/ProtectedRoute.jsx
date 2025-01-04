import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const userId = localStorage.getItem("userId");
    return userId ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
