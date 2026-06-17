import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("currentUserId")),
  );
  const [user, setUser] = useState({});

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`,
        {},
        {
          withCredentials: true
        }
      )
      localStorage.removeItem("currentUserId");
      toast.success("Logout Successfull!")
      navigate("/");
    } catch (error) {
      toast.error("Error occured!")
      console.log(error);
    }
  };

  const fetchUserFromDB = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/current-user`,
        {
          withCredentials: true
        }
      );
      setUser(response?.data?.user);
      console.log("user fetched successfully!");
      console.log(user);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchUserFromDB();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900">ScanBorrow</h1>
            <p className="text-xs text-slate-500">Smart Library System</p>
          </div>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          <NavLink
            to="/student/dashboard"
            className={({ isActive }) =>
              `font-semibold mx-1 ${isActive ? "text-indigo-500" : "text-black"}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/student/search-books"
            className={({ isActive }) =>
              `font-semibold mx-1 ${isActive ? "text-indigo-500" : "text-black"}`
            }
          >
            Search Book
          </NavLink>
          <NavLink
            to="/student/my-books"
            className={({ isActive }) =>
              `font-semibold mx-1 ${isActive ? "text-indigo-500" : "text-black"}`
            }
          >
            My Book
          </NavLink>
          <NavLink
            to="/student/history"
            className={({ isActive }) =>
              `font-semibold mx-1 ${isActive ? "text-indigo-500" : "text-black"}`
            }
          >
            History
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block md:flex items-center gap-1.5 px-2 py-2 rounded-full bg-gray-200">
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
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
