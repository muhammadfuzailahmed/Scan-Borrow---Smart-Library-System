import {
  BookOpen,
  CalendarDays,
  History,
  QrCode,
  Search,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [studentDashboardStatsData, setStudentDashboardStatsData] = useState(
    {},
  );
  const [studentDashboardIssuedBooksData, setStudentDashboardIssuedBooksData] =
    useState([]);
  const [books, setBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);

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
        `${import.meta.env.VITE_BACKEND_URL}/current-user`,
        {
          withCredentials: true
        }
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
        `${import.meta.env.VITE_STUDENT_BACKEND_URL}/student-dashboard-data`,
        {
          withCredentials: true
        }
      );
      setStudentDashboardStatsData(response?.data?.stats);
      setStudentDashboardIssuedBooksData(response?.data?.issuedBooks);
    } catch (error) {
      console.log("Error fetching dashboard data", error);
    }
  };

  const getOverDueBooks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_STUDENT_BACKEND_URL}/over-due-books`,
        {
          withCredentials: true
        }
      );
      if (response?.data?.books?.length === 0) {
        return;
      } else {
        toast.error("You have overdue books.");
        setBooks(response?.data?.books);
      }
    } catch (error) {}
  };

    const fetchRecommendedBooks = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_STUDENT_BACKEND_URL}/recommended-books`,
      {
        withCredentials: true
      }
    );

    setRecommendedBooks(response?.data?.suggestedBooks || []);
  } catch (error) {
    toast.error("Error fetching recommended books");
  }
};

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="text-right text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

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
    getOverDueBooks();
    fetchRecommendedBooks();
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

     {books.length > 0 && (
  <section className="my-6 w-full rounded-lg py-6">
    <h1 className="mb-3 text-center text-2xl font-bold text-slate-950 sm:text-3xl">
      Overdue Books
    </h1>

    <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 lg:block">
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
          {books.map((book) => (
            <tr key={book.bookData?.transactionCode} className="border-t">
              <td className="px-5 py-4 font-semibold text-slate-900">
                {book.bookName}
              </td>
              <td className="px-5 py-4 text-slate-600">
                {book.bookCopyCode}
              </td>
              <td className="px-5 py-4 font-mono text-indigo-600">
                {book.bookData?.transactionCode}
              </td>
              <td className="px-5 py-4 text-slate-600">
                {formatDate(book.bookData?.issueDate)}
              </td>
              <td className="px-5 py-4 text-slate-600">
                {formatDate(book.bookData?.dueDate)}
              </td>
              <td className="px-5 py-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  <CheckCircle size={14} />
                  {book.bookData?.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="grid gap-4 lg:hidden">
      {books.map((book) => (
        <div
          key={book.bookData?.transactionCode}
          className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold leading-snug text-slate-950">
                {book.bookName}
              </h2>
              <p className="mt-2 font-mono text-xs font-semibold text-indigo-600">
                {book.bookData?.transactionCode}
              </p>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <CheckCircle size={14} />
              {book.bookData?.status}
            </span>
          </div>

          <div className="mt-5 grid gap-3">
            <InfoRow label="Copy Code" value={book.bookCopyCode} />
            <InfoRow
              label="Issue Date"
              value={formatDate(book.bookData?.issueDate)}
            />
            <InfoRow
              label="Due Date"
              value={formatDate(book.bookData?.dueDate)}
            />
          </div>
        </div>
      ))}
    </div>
  </section>
)}

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
            {stats.nextDueDate
              ? formatDate(stats.nextDueDate)
              : "No Borrowed Books"}
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

<div className="hidden overflow-x-auto rounded-2xl border border-slate-200 lg:block">
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
          <td className="px-5 py-4 font-mono text-indigo-600">
            {book.transactionCode}
          </td>
          <td className="px-5 py-4 text-slate-600">
            {formatDate(book.issueDate)}
          </td>
          <td className="px-5 py-4 text-slate-600">
            {formatDate(book.dueDate)}
          </td>
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

<div className="grid gap-4 lg:hidden">
  {issuedBooks.map((book) => (
    <div
      key={book.transactionCode}
      className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold leading-snug text-slate-950">
            {book.bookName}
          </h2>
          <p className="mt-2 font-mono text-xs font-semibold text-indigo-600">
            {book.transactionCode}
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          <CheckCircle size={14} />
          {book.status}
        </span>
      </div>

      <div className="mt-5 grid gap-3">
        <InfoRow label="Copy Code" value={book.copyCode} />
        <InfoRow label="Issue Date" value={formatDate(book.issueDate)} />
        <InfoRow label="Due Date" value={formatDate(book.dueDate)} />
      </div>
    </div>
  ))}
</div>
      </section>

      <section className="mt-8 rounded-[32px] bg-white p-4 shadow-sm sm:p-6">
  <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
    <div>
      <p className="text-sm font-bold text-indigo-600">
        Personalized Suggestions
      </p>

      <h2 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
        Recommended Books For You
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
        Books recommended from your borrowed categories and popular library
        activity.
      </p>
    </div>

    <span className="w-fit rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
      {recommendedBooks.length} Books
    </span>
  </div>

  {recommendedBooks.length === 0 ? (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <p className="text-sm font-bold text-slate-700">
        No recommendations available yet.
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Borrow books first to receive personalized suggestions.
      </p>
    </div>
  ) : (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {recommendedBooks.map((book) => (
        <div
          key={book.bookId}
          className="flex min-h-[300px] flex-col rounded-[28px] border border-slate-200 bg-slate-50/70 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-xl font-bold leading-snug text-slate-950">
                {book.bookName}
              </h3>

              <p className="mt-2 text-sm font-semibold text-slate-500">
                {book.author || "Unknown Author"}
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
              {book.category || "General"}
            </span>
          </div>

          <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
            {book.bookDescription || "No description available."}
          </p>

          <div className="mt-5 rounded-2xl bg-white px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Why this book?
            </p>
            <p className="mt-1 text-sm font-medium text-slate-600">
              Recommended based on your borrowed categories and popular library
              activity.
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-500">
              Recommended
            </p>

            <button
              onClick={() => navigate("/student/search-books")}
              className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 sm:w-auto hover:cursor-pointer"
            >
              View Books
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</section>


    </main>
  );
}

export default Dashboard;
