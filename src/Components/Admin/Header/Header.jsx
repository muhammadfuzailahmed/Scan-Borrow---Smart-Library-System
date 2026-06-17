import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  BookCopy,
  History,
  LogOut,
  ShieldCheck,
  Proportions
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({});

  const fetchAdminFromDB = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/current-user`,
        {
          withCredentials: true
        }
      );

      setAdmin(response?.data?.user);
    } catch (error) {
      console.log("Error fetching admin data", error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchAdminFromDB();
  }, []);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-indigo-50 text-indigo-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-2 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              ScanBorrow Admin
            </h1>
            <p className="text-xs text-slate-500">Library Control Panel</p>
          </div>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/books" className={navLinkClass}>
            <BookOpen size={18} />
            Books
          </NavLink>

          <NavLink to="/admin/book-copies" className={navLinkClass}>
            <BookCopy size={18} />
            Book Copies
          </NavLink>

          <NavLink to="/admin/transactions" className={navLinkClass}>
            <History size={18} />
            Transactions
          </NavLink>

          <NavLink to="/admin/reports" className={navLinkClass}>
            <Proportions size={18} />
            Reports
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2 sm:flex">
            <p className="text-sm font-semibold text-slate-900">
              {admin.name || "Admin"}
            </p>
            <span className="text-slate-400">|</span>
            <p className="text-xs font-semibold text-slate-700">
              {admin.loginId || "ADMIN001"}
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