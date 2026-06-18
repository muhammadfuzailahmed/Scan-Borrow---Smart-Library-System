import React, { useEffect, useState } from "react";
import { CheckCircle, ArrowUpRight, ArrowLeft, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";

function MyBooks() {
  const navigate = useNavigate();
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [qrCodeModal, setQrCodeModal] = useState(false);
  const [transactionCode, setTransactionCode] = useState("");
  const [bookName, setBookName] = useState("");
  const [copyCode, setCopyCode] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const fetchBorrowedBooks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_STUDENT_BACKEND_URL}/borrowedBooks`,
        { withCredentials: true }
      );
      setIssuedBooks(response?.data?.issuedBooks || []);
    } catch (error) {
      toast.error("Error occurred");
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

  const hanldeReturnBookBtn = (tCode, bName, cCode, isDate, dDate) => {
    setTransactionCode(tCode);
    setBookName(bName);
    setCopyCode(cCode);
    setIssueDate(isDate);
    setDueDate(dDate);
    setQrCodeModal(true);
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  return qrCodeModal ? (
    <main className="min-h-[calc(100vh-80px)] px-4 py-4 sm:px-6">
      <button
        onClick={() => setQrCodeModal(false)}
        className="mb-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <section className="mx-auto max-w-md rounded-[32px] bg-white p-5 shadow-sm sm:p-8">
        <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-[28px] bg-slate-50">
          <QRCodeCanvas value={transactionCode} size={170} />
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
            Return QR Code
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            {bookName}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{copyCode}</p>
        </div>

        <div className="mt-6 space-y-3">
          <InfoRow label="Transaction" value={transactionCode} mono />
          <InfoRow label="Issue Date" value={formatDate(issueDate)} />
          <InfoRow label="Due Date" value={formatDate(dueDate)} />
        </div>

        <button
          onClick={() =>
            navigate("/student/scan-return", {
              state: { transactionCode },
            })
          }
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          Scan QR to Return
          <ArrowUpRight size={18} />
        </button>
      </section>
    </main>
  ) : (
    <section className="mt-6 rounded-[32px] bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 text-center sm:mb-8">
        <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
          Current Issued Books
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Books currently borrowed under your account.
        </p>
      </div>

      {issuedBooks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-sm font-bold text-slate-700">
            No issued books found.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Borrowed books will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  {[
                    "Book",
                    "Copy Code",
                    "Transaction",
                    "Issue Date",
                    "Due Date",
                    "Status",
                    "Action",
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
                {issuedBooks.map((book) => (
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

                    <td className="px-6 py-5">
                      <button
                        onClick={() =>
                          hanldeReturnBookBtn(
                            book.transactionCode,
                            book.bookName,
                            book.copyCode,
                            book.issueDate,
                            book.dueDate
                          )
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600"
                      >
                        Return
                        <ArrowUpRight size={17} />
                      </button>
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

                <button
                  onClick={() =>
                    hanldeReturnBookBtn(
                      book.transactionCode,
                      book.bookName,
                      book.copyCode,
                      book.issueDate,
                      book.dueDate
                    )
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-600"
                >
                  Return Book
                  <ArrowUpRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function InfoRow({ label, value, mono }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p
        className={`text-right text-sm font-semibold text-slate-800 ${
          mono ? "font-mono text-indigo-600" : ""
        }`}
      >
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

export default MyBooks;