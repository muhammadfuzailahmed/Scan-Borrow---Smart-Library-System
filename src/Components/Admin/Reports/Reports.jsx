import axios from "axios";
import {
  AlertTriangle,
  CircleDollarSign,
  History,
  Trophy,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Reports() {
  const [mostBorrowedBooks, setMostBorrowedBooks] = useState([]);
  const [defaultersList, setDefaultersList] = useState([]);
  const [fineReports, setFineReports] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const fetchReportsData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ADMIN_BACKEND_URL}/admin-records`
      );

      setMostBorrowedBooks(response?.data?.mostBorrowedBooks || []);
      setDefaultersList(response?.data?.defaultersList || []);
      setFineReports(response?.data?.fineReport || []);
      setRecentTransactions(response?.data?.recentTransactions || []);
    } catch (error) {
      toast.error("Error fetching reports data");
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not Returned";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section className="mb-8 rounded-[32px] bg-gradient-to-br from-slate-900 to-indigo-900 p-8 text-white shadow-lg">
        <p className="text-sm font-semibold text-indigo-200">Admin Reports</p>

        <h1 className="mt-3 text-4xl font-bold">Library Circulation Reports</h1>

        <p className="mt-3 max-w-3xl text-slate-300">
          Track borrowing trends, overdue students, fine records, and recent
          circulation activity.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Popular Books"
          value={mostBorrowedBooks.length}
          icon={<Trophy size={22} />}
          color="text-yellow-500"
        />
        <SummaryCard
          title="Defaulters"
          value={defaultersList.length}
          icon={<AlertTriangle size={22} />}
          color="text-red-500"
        />
        <SummaryCard
          title="Fine Records"
          value={fineReports.length}
          icon={<CircleDollarSign size={22} />}
          color="text-emerald-600"
        />
        <SummaryCard
          title="Recent Records"
          value={recentTransactions.length}
          icon={<History size={22} />}
          color="text-blue-600"
        />
      </section>

      <section className="mt-8 space-y-8">
        <ReportSection
          title="Most Borrowed Books"
          description="Books with the highest borrowing activity."
          icon={<Trophy className="text-yellow-500" size={24} />}
          headers={["Book Name", "Author", "Times Borrowed"]}
        >
          {mostBorrowedBooks.map((item, index) => (
            <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 hover:cursor-pointer">
              <td className="px-6 py-5 font-semibold text-slate-900">
                {item.bookName}
              </td>
              <td className="px-6 py-5 text-sm text-slate-600">
                {item.author || "N/A"}
              </td>
              <td className="px-6 py-5">
                <span className="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-bold text-indigo-700">
                  {item.borrowCount} times
                </span>
              </td>
            </tr>
          ))}
        </ReportSection>

        <ReportSection
          title="Defaulters List"
          description="Students who currently have overdue books."
          icon={<AlertTriangle className="text-red-500" size={24} />}
          headers={[
            "Student",
            "Book",
            "Copy Code",
            "Due Date",
            "Days Late",
            "Current Fine",
          ]}
        >
          {defaultersList.map((item, index) => (
            <tr key={index} className="border-b border-slate-100 hover:bg-red-50/40 hover:cursor-pointer">
              <td className="px-6 py-5">
                <p className="font-semibold text-slate-900">{item.studentName}</p>
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
                <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
                  <Clock size={14} />
                  {item.daysLate} days
                </span>
              </td>

              <td className="px-6 py-5 text-sm font-bold text-red-600">
                Rs. {item.fineAmount}
              </td>
            </tr>
          ))}
        </ReportSection>

        <ReportSection
          title="Fine Report"
          description="Returned books where a late fine was charged."
          icon={<CircleDollarSign className="text-emerald-600" size={24} />}
          headers={["Student", "Book", "Return Date", "Fine Amount"]}
        >
          {fineReports.map((item, index) => (
            <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 hover:cursor-pointer">
              <td className="px-6 py-5">
                <p className="font-semibold text-slate-900">{item.studentName}</p>
                <p className="text-xs text-slate-500">{item.loginId}</p>
              </td>

              <td className="px-6 py-5 font-semibold text-slate-900">
                {item.bookName}
              </td>

              <td className="px-6 py-5 text-sm text-slate-600">
                {formatDate(item.returnDate)}
              </td>

              <td className="px-6 py-5">
                <span className="rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-bold text-emerald-700">
                  Rs. {item.fineAmount}
                </span>
              </td>
            </tr>
          ))}
        </ReportSection>

        <ReportSection
          title="Recent Transactions"
          description="Latest borrowing and return activity in the system."
          icon={<History className="text-blue-600" size={24} />}
          headers={[
            "Transaction Code",
            "Student",
            "Book",
            "Copy Code",
            "Issue Date",
            "Return Date",
            "Status",
          ]}
        >
          {recentTransactions.map((item) => (
            <tr
              key={item.transactionCode}
              className="border-b border-slate-100 hover:bg-slate-50 hover:cursor-pointer"
            >
              <td className="px-6 py-5 font-mono text-sm font-semibold text-indigo-600">
                {item.transactionCode}
              </td>

              <td className="px-6 py-5">
                <p className="font-semibold text-slate-900">{item.studentName}</p>
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
                {formatDate(item.issueDate)}
              </td>

              <td className="px-6 py-5 text-sm text-slate-600">
                {formatDate(item.returnDate)}
              </td>

              <td className="px-6 py-5">
                <StatusBadge status={item.status} />
              </td>
            </tr>
          ))}
        </ReportSection>
      </section>
    </main>
  );
}

function SummaryCard({ title, value, icon, color }) {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <div className={color}>{icon}</div>
      </div>
      <p className="mt-4 text-3xl font-bold text-slate-950">{value}</p>
    </div>
  );
}

function ReportSection({ title, description, icon, headers, children }) {
  return (
    <section className="rounded-[32px] bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-slate-50 p-3">{icon}</div>

          <div>
            <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              {headers.map((header) => (
                <th
                  key={header}
                  className="whitespace-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {children?.length ? (
              children
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-6 py-10 text-center text-sm font-medium text-slate-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatusBadge({ status }) {
  const isReturned = status === "RETURNED";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
        isReturned
          ? "bg-emerald-50 text-emerald-700"
          : "bg-orange-50 text-orange-700"
      }`}
    >
      <CheckCircle size={14} />
      {status}
    </span>
  );
}

export default Reports;