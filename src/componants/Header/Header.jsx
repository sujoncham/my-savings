import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const user = useSelector((state) => state.auth.user); // Get user from Redux

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");

    setIsAuthenticated(storedUserId);
    setUserRole(storedRole);
  }, [user]); // Runs when `user` changes

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Remove user ID
    localStorage.removeItem("role"); // Remove role
    window.location.href = "/signin"; // Redirect to login
  };

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      return (
        <div className="flex items-center space-x-4">
          <button onClick={handleLogout} className="bg-blue-700 px-4 py-2 rounded">
            Logout
          </button>
          
          <p className="text-sm text-gray-200">{userRole || "No Role"}</p>
        </div>
      );
    } else {
      return (
        <Link to="/signin" className="bg-blue-700 px-4 py-2 rounded">
          Login
        </Link>
      );
    }
  };

  return (
    <header className="bg-blue-500 text-white sticky z-50 top-0">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link className="uppercase" to="/">My Savings</Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <NavLink to="/" className="px-4 py-2 hover:bg-gray-700">Home</NavLink>
          <NavLink to="/loan" className="px-4 py-2 hover:bg-gray-700">Loan</NavLink>
          <NavLink to="/personList" className="px-4 py-2 hover:bg-gray-700">Members List</NavLink>
          {userRole === "admin" && (
            <NavLink to="/dashboard" className="px-4 py-2 hover:bg-gray-700">Dashboard</NavLink>
          )}
        </nav>

        {/* User Authentication */}
        <div className="hidden md:flex space-x-6">
          {handleLoginLogout()}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "X" : "="}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-600 px-4 py-2">
          <NavLink to="/" className="block px-4 py-2 hover:bg-gray-700">Home</NavLink>
          <NavLink to="/loan" className="block px-4 py-2 hover:bg-gray-700">Loan</NavLink>
          <NavLink to="/personList" className="block px-4 py-2 hover:bg-gray-700">Members List</NavLink>
          {userRole === "admin" && (
            <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-gray-700">Dashboard</NavLink>
          )}
          {handleLoginLogout()}
        </nav>
      )}
    </header>
  );
};

export default Header;
