import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar (Mobile + Desktop) */}
      <aside
        className={`bg-green-800 text-white w-64 flex flex-col fixed lg:static top-0 left-0 h-full z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="p-4 text-lg font-bold border-b border-gray-700 flex items-center justify-between">
          <span>Dashboard Menu</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white text-2xl"
          >
            ✖
          </button>
        </div>
        <nav className="flex-grow overflow-y-auto">
          <ul className="space-y-2 p-4">
            <li>
              <Link
                to="savingsEdit"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Savings Edit
              </Link>
            </li>
            <li>
              <Link
                to="loanEdit"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                loan Edit
              </Link>
            </li>
            <li>
              <Link
                to="allMessages"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                All messages
              </Link>
            </li>
            <li>
              <Link
                to="addBlog"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Add Blog
              </Link>
            </li>
            <li>
              <Link
                to="addTestimonial"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Add Testimonial
              </Link>
            </li>
            <li>
              <Link
                to="expenseEdit"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Expense Edit
              </Link>
            </li>
            <li>
              <Link
                to="blogEdit"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Blog Edit
              </Link>
            </li>
           
            <li>
              <Link
                to="users"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="addDonation"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Add Donation
              </Link>
            </li>
            <li>
              <Link
                to="donation"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Donate 
              </Link>
            </li>
            <li>
              <Link
                to="addExpense"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                AddExpense
              </Link>
            </li>
            <li>
              <Link
                to="settings"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => setIsSidebarOpen(false)}
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-4 pt-16 lg:pt-4 min-h-screen relative">
        {/* Toggle Button for Sidebar */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden bg-gray-800 text-white p-2 rounded-full fixed top-4 left-4 z-50"
        >
          ☰
        </button>

        {/* Outlet renders child routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
