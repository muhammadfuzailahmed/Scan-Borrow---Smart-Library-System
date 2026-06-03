import axios from "axios";
import {
  BookOpen,
  BookCopy,
  CheckCircle,
  Clock,
  History,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
    const [statsData, setStatsData] = useState({})
    const [recentTransactions, setRecentTransactions] = useState([])

    const fetchAdminDashboardData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin-dashboard-data`)
            setStatsData(response?.data?.stats)
            setRecentTransactions(response?.data?.recentTransactions)
        } catch (error) {
            toast.error("Error fetching data")
        }
    }

     const formatDate = (date) => {
  if (!date) return "No Borrowed Books";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

  const stats = {
    totalBooks: statsData?.totalBooks,
    totalCopies: statsData?.totalCopies,
    availableCopies: statsData?.availableCopies,
    issuedCopies: statsData?.issuedCopies,
    totalTransactions: statsData?.totalTransactions,
    activeBorrowers: statsData?.activeBorrowers,
  };

  useEffect(() => {
    fetchAdminDashboardData();
  }, [])

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section className="mb-8 rounded-[32px] bg-gradient-to-br from-slate-900 to-indigo-900 p-8 text-white shadow-lg">
        <p className="text-sm font-semibold text-indigo-200">
          Admin Dashboard
        </p>

        <h1 className="mt-3 text-4xl font-bold">Library Control Panel</h1>

        <p className="mt-3 max-w-2xl text-slate-300">
          Monitor books, physical copies, issued records, and student borrowing
          activity from one place.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/admin/books")}
            className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100 hover:cursor-pointer"
          >
            <BookOpen size={20} />
            View Books
          </button>

          <button
            onClick={() => navigate("/admin/book-copies")}
            className="flex items-center gap-2 rounded-2xl border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10 hover:cursor-pointer"
          >
            <BookCopy size={20} />
            View Book Copies
          </button>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">Total Books</p>
            <BookOpen className="text-indigo-600" size={22} />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-950">
            {stats.totalBooks}
          </p>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">Total Copies</p>
            <BookCopy className="text-violet-600" size={22} />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-950">
            {stats.totalCopies}
          </p>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Available Copies
            </p>
            <CheckCircle className="text-emerald-600" size={22} />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-950">
            {stats.availableCopies}
          </p>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Issued Copies
            </p>
            <Clock className="text-orange-500" size={22} />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-950">
            {stats.issuedCopies}
          </p>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Transactions
            </p>
            <History className="text-blue-600" size={22} />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-950">
            {stats.totalTransactions}
          </p>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Active Borrowers
            </p>
            <Users className="text-pink-600" size={22} />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-950">
            {stats.activeBorrowers}
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-[32px] bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Recent Borrow Transactions
            </h2>
            <p className="text-sm text-slate-500">
              Latest book issuing records in the system.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/transactions")}
            className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View All
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Transaction
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Student
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Book
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Copy
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Due Date
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentTransactions.map((item) => (
                <tr
                  key={item.transactionCode}
                  className="border-b border-slate-100 transition hover:bg-slate-50 hover:cursor-pointer"
                >
                  <td className="px-6 py-5 font-mono text-sm text-indigo-600">
                    {item.transactionCode}
                  </td>

                  <td className="px-6 py-5">
                    <p className="font-semibold text-slate-900">
                      {item.studentName}
                    </p>
                    <p className="text-xs text-slate-500">{item.loginId}</p>
                  </td>

                  <td className="px-6 py-5 font-semibold text-slate-900">
                    {item.bookName}
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {item.copyCode}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-600">
                    {formatDate(item.dueDate)}
                  </td>

                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      <CheckCircle size={14} />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;