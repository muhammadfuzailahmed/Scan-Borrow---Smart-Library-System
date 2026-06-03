import {
  BookOpen,
  CalendarDays,
  History,
  QrCode,
  Search,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("currentUserId")),
  );
  const [user, setUser] = useState({});
  const [studentDashboardStatsData, setStudentDashboardStatsData] = useState(
    {},
  );
  const [studentDashboardIssuedBooksData, setStudentDashboardIssuedBooksData] =
    useState([]);

  const stats = {
    borrowedBooks: studentDashboardStatsData.borrowedBooks,
    maxBooks: studentDashboardStatsData.maxBooks,
    totalTransactions: studentDashboardStatsData.totalTransactions,
    nextDueDate: studentDashboardStatsData.nextDueDate,
  };

  const issuedBooks = studentDashboardIssuedBooksData;

  const fetchUserFromDB = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_STUDENT_BACKEND_URL}/current-user/${userId}`,
      );
      setUser(response?.data?.user);
      console.log("user fetched successfully!");
      console.log(user);
    } catch (error) {
      console.log("Error fetching student data", error);
    }
  };

  const fetchStudentDashboardData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_STUDENT_BACKEND_URL}/student-dashboard-data/${userId}`,
      );
      setStudentDashboardStatsData(response?.data?.stats);
      setStudentDashboardIssuedBooksData(response?.data?.issuedBooks);
    } catch (error) {
      console.log("Error fetching dashboard data", error);
    }
  };

  const formatDate = (date) => {
  if (!date) return "No Borrowed Books";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

  useEffect(() => {
    fetchUserFromDB();
    fetchStudentDashboardData();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="rounded-[32px] bg-gradient-to-br from-indigo-600 to-violet-700 p-8 text-white shadow-lg">
          <p className="text-sm font-medium text-indigo-100">
            Student Dashboard
          </p>

          <h1 className="mt-3 text-4xl font-bold">Welcome back, {user.name}</h1>

          <p className="mt-3 max-w-2xl text-indigo-100">
            Browse available books, scan the QR code of a book copy, and borrow
            it digitally. You can borrow up to 3 books at one time.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/student/search-books")}
              className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50 hover:cursor-pointer"
            >
              <Search size={20} />
              Search Books
            </button>

            <button
              onClick={() => navigate("/student/scan-qr")}
              className="flex items-center gap-2 rounded-2xl border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10 hover:cursor-pointer"
            >
              <QrCode size={20} />
              Scan QR to Borrow
            </button>
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-7 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">
            Borrowing Limit
          </p>

          <div className="mt-5 flex items-end gap-2">
            <span className="text-6xl font-bold text-slate-950">
              {stats.borrowedBooks}
            </span>
            <span className="pb-2 text-2xl font-bold text-slate-400">
              / {stats.maxBooks}
            </span>
          </div>

          <div className="mt-6 h-3 rounded-full bg-slate-100">
            <div
              className="h-3 rounded-full bg-indigo-600"
              style={{
                width: `${(stats.borrowedBooks / stats.maxBooks) * 100}%`,
              }}
            />
          </div>

          <p className="mt-4 text-sm text-slate-500">
            You can borrow {stats.maxBooks - stats.borrowedBooks} more books.
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-3">
        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Books Borrowed
            </p>
            <BookOpen className="text-indigo-600" size={22} />
          </div>

          <p className="mt-4 text-3xl font-bold text-slate-950">
            {stats.borrowedBooks} / {stats.maxBooks}
          </p>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Total Transactions
            </p>
            <History className="text-violet-600" size={22} />
          </div>

          <p className="mt-4 text-3xl font-bold text-slate-950">
            {stats.totalTransactions}
          </p>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Next Due Date
            </p>
            <CalendarDays className="text-orange-500" size={22} />
          </div>

          <p className="mt-4 text-2xl font-bold text-slate-950">
            {stats.nextDueDate ? formatDate(stats.nextDueDate) : "No Borrowed Books"}
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-[32px] bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Current Issued Books
            </h2>
            <p className="text-sm text-slate-500">
              Books currently borrowed under your account.
            </p>
          </div>

          <button
            onClick={() => navigate("/student/my-books")}
            className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-4">Book Name</th>
                <th className="px-5 py-4">Copy Code</th>
                <th className="px-5 py-4">Transaction ID</th>
                <th className="px-5 py-4">Issue Date</th>
                <th className="px-5 py-4">Due Date</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {issuedBooks.map((book) => (
                <tr key={book.transactionCode} className="border-t">
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {book.bookName}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{book.copyCode}</td>
                  <td className="px-5 py-4 text-slate-600">
                    {book.transactionCode}
                  </td>
                  <td className="px-5 py-4 text-slate-600">{formatDate(book.issueDate)}</td>
                  <td className="px-5 py-4 text-slate-600">{formatDate(book.dueDate)}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      <CheckCircle size={14} />
                      {book.status}
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
