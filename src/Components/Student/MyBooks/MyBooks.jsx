import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

function MyBooks() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("currentUserId")),
  );
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
        `${import.meta.env.VITE_STUDENT_BACKEND_URL}/borrowedBooks/${userId}`,
      );
      setIssuedBooks(response?.data?.issuedBooks);
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
    <>
      <div
        onClick={() => setQrCodeModal(false)}
        className="flex items-center gap-1 ml-6 mt-2 hover:cursor-pointer"
      >
        <div>
          <ArrowLeft color="black" strokeWidth={2.5} />
        </div>
        <p className="font-bold text-lg">back</p>
      </div>
      <div className="bg-gray-200 rounded-md md:w-auto w-[90vw] px-12 py-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-center">
          <QRCodeCanvas value={transactionCode} size={160} />
        </div>
        <div className="mt-4 text-center">
          <p>
            <span className="font-bold text-lg">Book Name: </span>
            {bookName}
          </p>
          <p>
            <span className="font-bold text-lg">Copy Code: </span>
            {copyCode}
          </p>
          <p>
            <span className="font-bold text-lg">Issue Date: </span>
            {issueDate}
          </p>
          <p>
            <span className="font-bold text-lg">Due Date: </span>
            {dueDate}
          </p>
        </div>
        <div>
          <button
            onClick={() =>
              navigate("/student/scan-return", {
                state: {
                  transactionCode,
                },
              })
            }
            className="mt-5 w-full rounded-xl bg-blue-500 px-4 py-3 font-bold text-white hover:bg-blue-600 hover:cursor-pointer"
          >
            Scan QR to Return
          </button>
        </div>
      </div>
    </>
  ) : (
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

        <div className=" rounded-3xl border border-slate-200 bg-white shadow-sm">
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
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {issuedBooks.map((book) => (
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
                  <button
                    onClick={() =>
                      hanldeReturnBookBtn(
                        book.transactionCode,
                        book.bookName,
                        book.copyCode,
                        book.issueDate,
                        book.dueDate,
                      )
                    }
                    className="flex items-center gap-1 bg-red-500 px-4 py-1.5 rounded-md mt-4 justify-center hover:bg-red-600 hover:cursor-pointer"
                  >
                    <p className="text-white font-bold text-base">return</p>
                    <div>
                      <ArrowUpRight color="white" strokeWidth={2.5} />
                    </div>
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default MyBooks;
