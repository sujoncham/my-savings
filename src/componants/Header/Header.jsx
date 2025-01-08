import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <Link key="home" to="/" className="block hover:text-gray-200">
      Home
    </Link>,
    <Link key="loan" to="/loan" className="block hover:text-gray-200">
      Loan
    </Link>,
    <Link key="personList" to="/personList" className="block hover:text-gray-200">
      Person List
    </Link>,
    <Link key="expense" to="/expense" className="block hover:text-gray-200">
      Expense
    </Link>,
    <Link key="dashboard" to="/dashboard" className="block hover:text-gray-200">
      Dashboard
    </Link>,
   
    
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
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
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
