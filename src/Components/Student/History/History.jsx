import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function History() {
  const [borrowedBooksHistory, setBorrowedBooksHistory] = useState([]);

  const fetchBorrowedBooksHistory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_STUDENT_BACKEND_URL}/borrowedBooksHistory`,
        {
          withCredentials: true,
        }
      );

      setBorrowedBooksHistory(response?.data?.borrowedBooksHistory || []);
    } catch (error) {
      toast.error("Error occurred");
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
    fetchBorrowedBooksHistory();
  }, []);

  return (
    <section className="mt-6 rounded-[32px] bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 text-center sm:mb-8">
        <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
          Borrowing History
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Complete record of your issued and returned books.
        </p>
      </div>

      {borrowedBooksHistory.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-sm font-bold text-slate-700">
            No history found.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Your borrowing history will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  {[
                    "Book",
                    "Copy Code",
                    "Transaction",
                    "Issue Date",
                    "Due Date",
                    "Status",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {borrowedBooksHistory.map((book) => (
                  <tr
                    key={book.transactionCode}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <div className="font-semibold text-slate-900">
                        {book.bookName}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                        {book.copyCode}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-mono text-sm text-indigo-600">
                        {book.transactionCode}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {formatDate(book.issueDate)}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {formatDate(book.dueDate)}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={book.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 lg:hidden">
            {borrowedBooksHistory.map((book) => (
              <div
                key={book.transactionCode}
                className="rounded-[28px] border border-slate-200 bg-slate-50/70 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold leading-snug text-slate-950">
                      {book.bookName}
                    </h3>

                    <p className="mt-2 font-mono text-xs font-semibold text-indigo-600">
                      {book.transactionCode}
                    </p>
                  </div>

                  <StatusBadge status={book.status} />
                </div>

                <div className="mt-5 grid gap-3">
                  <InfoRow label="Copy Code" value={book.copyCode} />
                  <InfoRow label="Issue Date" value={formatDate(book.issueDate)} />
                  <InfoRow label="Due Date" value={formatDate(book.dueDate)} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="text-right text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const isIssued = status === "ISSUED";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
        isIssued
          ? "bg-emerald-50 text-emerald-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      <CheckCircle size={14} />
      {isIssued ? "Issued" : "Returned"}
    </span>
  );
}

export default History;