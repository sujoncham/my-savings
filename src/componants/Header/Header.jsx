import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = localStorage.getItem("userId");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => { 
    
      setIsAuthenticated(localStorage.getItem("userId"));
    
  }, [user]);
  const handleLogout = () => {
    localStorage.removeItem("userId"); // Remove user ID from localStorage
    window.location.href = "/signin"; // Redirect to the signin page
  };

  const menu = [
    
    
    <NavLink key="home" to="/" className={({ isActive }) =>
      `block px-4 py-2 rounded ${isActive ?
        "bg-gray-700 font-bold border-l-4 border-white" : "hover:bg-gray-700"}`}>
      Home
    </NavLink>,
    <NavLink key="loan" to="/loan" className={({ isActive }) =>
      `block px-4 py-2 rounded ${isActive ?
        "bg-gray-700 font-bold border-l-4 border-white" : "hover:bg-gray-700"}`}>
      Loan
    </NavLink>,
    <NavLink key="personList" to="/personList" className={({ isActive }) =>
      `block px-4 py-2 rounded ${isActive ?
        "bg-gray-700 font-bold border-l-4 border-white" : "hover:bg-gray-700"}`}>
      Members List
    </NavLink>,
    <NavLink key="expense" to="/expense" className={({ isActive }) =>
      `block px-4 py-2 rounded ${isActive ?
        "bg-gray-700 font-bold border-l-4 border-white" : "hover:bg-gray-700"}`}>
      Expense
    </NavLink>,
    <NavLink key="blogs" to="/blogs" className={({ isActive }) =>
      `block px-4 py-2 rounded ${isActive ?
        "bg-gray-700 font-bold border-l-4 border-white" : "hover:bg-gray-700"}`}>
      Blogs
    </NavLink>,
    <NavLink key="dashboard" to="/dashboard" className={({ isActive }) =>
      `block px-4 py-2 rounded ${isActive ?
        "bg-gray-700 font-bold border-l-4 border-white" : "hover:bg-gray-700"}`}>
      Dashboard
    </NavLink>,
    
    
  ];

  return (
    <header className="bg-blue-500 text-white sticky z-50 top-0">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link className="uppercase" to="/">my savings</Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">{menu}</nav>
        <div>
        {!isAuthenticated ? (<div className="flex space-x-4">
        <Link key="signin" to="/signin" className="block hover:text-gray-200 bg-blue-700 px-4 py-2 rounded">
          Login
        </Link>
        
            </div> ):
          <button onClick={handleLogout} className="block hover:text-gray-200 bg-blue-700 px-4 py-2 rounded">
          Logout
        </button>}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
         
          {isMenuOpen ? <span className="fas fa-times">yes</span> : <span className="fas fa-bars">no</span>}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-600 text-white space-y-4 px-4 py-2">
          {menu}
        </nav>
      )}
    </header>
  );
};

export default Header;
