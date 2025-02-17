import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const role = useSelector((state) => state.auth.role); // Get user role


  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}
      <aside
        className={`bg-green-800 text-white w-64 flex flex-col fixed lg:static top-0 left-0 z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 min-h-screen`}
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
            {/* Links */}
            {role === "admin" && (
              <li>
                <NavLink
                  to="savingsEdit"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-700 font-bold border-l-4 border-white"
                        : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Savings Edit
                </NavLink>
              </li>
            )}
            {role === "admin" && (
              <li>
                <NavLink
                  to="loanEdit"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-700 font-bold border-l-4 border-white"
                        : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Loan Edit
                </NavLink>
              </li>
            )}
           {(role === "admin" || role === "user") && (
              <li>
                <NavLink
                  to="allMessages"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-700 font-bold border-l-4 border-white"
                        : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  All Messages
                </NavLink>
              </li>
            )}
            {(role === "admin" || role === "user") && (
              <li>
                <NavLink
                  to="addTestimonial"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-700 font-bold border-l-4 border-white"
                        : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Add Testimonial
                </NavLink>
              </li>
            )}
            {(role === "admin" || role === "user") && (
              <li>
                <NavLink
                  to="addBlog"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-700 font-bold border-l-4 border-white"
                        : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Add Blog
                </NavLink>
              </li>
            )}
            {role === "admin" && (
              <li>
                <NavLink
                  to="blogEdit"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-700 font-bold border-l-4 border-white"
                        : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Blog Edit
                </NavLink>
              </li>
            )}
            {(role === "admin" || role === "user") && (
              <li>
                <NavLink
                  to="users"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-700 font-bold border-l-4 border-white"
                        : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Users
                </NavLink>
              </li>
            )}
            {(role === "admin" || role === "user") && (
              <li>
                <NavLink
                  to="donation"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-700 font-bold border-l-4 border-white"
                        : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Donation & Donate
                </NavLink>
              </li>
            )}
            {(role === "admin" || role === "user") && (
              <li>
                <NavLink
                  to="addExpense"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-700 font-bold border-l-4 border-white"
                        : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Add Expense
                </NavLink>
              </li>
            )}
            {role === "admin" && (
              <li>
                <NavLink
                  to="expenseEdit"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-700 font-bold border-l-4 border-white"
                        : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Expense Edit
                </NavLink>
              </li>
            )}
            {(role === "admin" || role === "user") && (
              <li>
                <NavLink
                  to="settings"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded ${
                      isActive
                        ? "bg-gray-700 font-bold border-l-4 border-white"
                        : "hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Settings
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-4 pt-16 lg:pt-4 min-h-screen overflow-auto relative">
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
