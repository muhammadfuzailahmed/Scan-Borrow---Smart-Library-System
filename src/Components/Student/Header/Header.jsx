import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/logout`,
        {},
        { withCredentials: true }
      );

      toast.success("Logout Successful!");
      navigate("/");
    } catch (error) {
      toast.error("Error occurred!");
      console.log(error);
    }
  };

  const fetchUserFromDB = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/current-user`,
        { withCredentials: true }
      );
      setUser(response?.data?.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserFromDB();
  }, []);

  const navLinks = [
    { title: "Dashboard", path: "/student/dashboard" },
    { title: "Search Book", path: "/student/search-books" },
    { title: "My Book", path: "/student/my-books" },
    { title: "History", path: "/student/history" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div>
          <Link to={"/student/dashboard"}>
          <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
            ScanBorrow
          </h1>
          <p className="text-xs text-slate-500">Smart Library System</p>
          </Link>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `mx-1 font-semibold ${
                  isActive ? "text-indigo-500" : "text-black"
                }`
              }
            >
              {link.title}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-1.5 rounded-full bg-gray-200 px-3 py-2 text-right">
            <p className="text-sm font-semibold text-slate-900">{user.name}</p>
            <p>|</p>
            <p className="text-xs font-semibold text-slate-900">
              {user.loginId}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 hover:cursor-pointer"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-2xl bg-slate-100 p-2 text-slate-800 lg:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="mb-4 rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-sm font-bold text-slate-900">
              {user.name || "Student"}
            </p>
            <p className="text-xs font-semibold text-slate-500">
              {user.loginId || "Login ID"}
            </p>
          </div>

          <nav className="grid gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-bold ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700 cursor-pointer"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;