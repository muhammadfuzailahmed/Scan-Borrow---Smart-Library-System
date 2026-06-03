import { BookCopy, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

function BookCopies() {
  const [bookCopies, setBookCopies] = useState([]);

  const fetchBookCopies = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin-book-copies-details`
      );

      setBookCopies(response?.data?.bookCopies || []);
    } catch (error) {
      console.log("Error fetching book copies", error);
    }
  };

  useEffect(() => {
    fetchBookCopies();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section className="mb-6 rounded-[32px] bg-gradient-to-br from-slate-900 to-indigo-900 p-8 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/10 p-3">
            <BookCopy size={28} />
          </div>

          <div>
            <p className="text-sm font-semibold text-indigo-200">
              Admin Panel
            </p>
            <h1 className="text-4xl font-bold">Book Copies</h1>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-slate-300">
          View all physical book copies, QR values, and current copy status.
        </p>
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-950">
            Physical Book Copies
          </h2>
          <p className="text-sm text-slate-500">
            Each copy has a unique QR code used for borrowing.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Book
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Copy Code
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  QR Code
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {bookCopies.map((copy) => (
                <tr
                  key={copy.bookCopyId}
                  className="border-b border-slate-100 transition hover:bg-slate-50 hover:cursor-pointer"
                >
                  <td className="px-6 py-5 font-semibold text-slate-900">
                    {copy.bookName}
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {copy.copyCode}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span className="font-mono text-sm font-semibold text-indigo-600">
                      {copy.QRcode}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    {copy.isIssued ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                        <XCircle size={14} />
                        Issued
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        <CheckCircle size={14} />
                        Available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookCopies.length === 0 && (
            <div className="p-8 text-center">
              <p className="font-semibold text-slate-700">
                No book copies found.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default BookCopies;