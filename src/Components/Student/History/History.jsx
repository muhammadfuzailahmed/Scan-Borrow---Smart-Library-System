import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function History() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("currentUserId")),
  );
  const [borrowedBooksHistory, setBorrowedBooksHistory] = useState([]);

  const fetchBorrowedBooksHistory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/borrowedBooksHistory/${userId}`,
      );
      setBorrowedBooksHistory(response?.data?.borrowedBooksHistory);
    } catch (error) {
      toast.error("Error occured");
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
    fetchBorrowedBooksHistory();
  }, []);

  return (
    <>
      <section className="mt-6 rounded-[32px] bg-white p-6 shadow-sm">
        <div className="mb-8 text-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Current Issued Books
            </h2>
            <p className="text-sm text-slate-500">
              Books currently borrowed under your account.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Book
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Copy Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Transaction
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Issue Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Due Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {borrowedBooksHistory.map((book) => (
                <tr
                  key={book.transactionCode}
                  className="border-b border-slate-100 transition hover:bg-slate-50 hover:cursor-pointer"
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
                    {book.status === "ISSUED" ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        <CheckCircle size={14} />
                        Issued
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                        <CheckCircle size={14} />
                        Returned
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default History;
