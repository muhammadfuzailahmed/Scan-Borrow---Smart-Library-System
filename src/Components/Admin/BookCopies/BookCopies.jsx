import { BookCopy, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function BookCopies() {
  const [bookCopies, setBookCopies] = useState([]);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [copyCode, setCopyCode] = useState("");
  const [QRcode, setQRcode] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookId, setBookId] = useState("");
  const [books, setBooks] = useState([]);

  const fetchBookCopies = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ADMIN_BACKEND_URL}/admin-book-copies-details`,
        {
          withCredentials: true,
        },
      );

      setBookCopies(response?.data?.bookCopies || []);
    } catch (error) {
      console.log("Error fetching book copies", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ADMIN_BACKEND_URL}/admin-book-details`,
        {
          withCredentials: true,
        },
      );
      setBooks(response?.data?.books || []);
    } catch (error) {
      console.log("Error fetching admin books", error);
    }
  };

  const handleAddBookCopyButton = async () => {
    if(!bookId || !copyCode ||!QRcode) {
      toast.error("Fill all required fields!")
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_ADMIN_BACKEND_URL}/add-book-copy`, {
        bookId,
        copyCode,
        QRcode
      },
    {
      withCredentials: true
    }
  )
  toast.success("Book copy added")
  setShowAddBookModal(false)
  setBookId("")
  setBookName("")
  setCopyCode("")
  setQRcode("")
    } catch (error) {
      toast.error(error.response?.data?.message)
    }

  }

  const handleDeleteButton = async (bookCopyId) => {
    console.log(bookCopyId)
    try {
      await axios.post(`${import.meta.env.VITE_ADMIN_BACKEND_URL}/delete-book-copy`,
        {
          bookCopyId
        },
        {
          withCredentials: true
        }
      )
      toast.success("Book Copy deleted")
      fetchBookCopies()
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }


  useEffect(() => {
    fetchBookCopies();
    fetchBooks();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 relative">
      {showAddBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Add New Book Copy</h2>

              <button
                onClick={() => setShowAddBookModal(false)}
                className="text-2xl font-bold text-gray-500 hover:text-black hover:cursor-pointer"
              >
                ×
              </button>
            </div>

            <div>
              <label className="mb-1 block font-medium">Select Book</label>

              <select
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                className="w-full rounded-lg border p-3"
              >
                <option value="">Select a book</option>

                {books.map((book) => (
                  <option key={book.bookId} value={book.bookId}>
                    {book.bookName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block font-medium">Copy Code</label>
              <input
                type="text"
                value={copyCode}
                onChange={(e) => setCopyCode(e.target.value)}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">QRCode Value</label>
              <input
                type="text"
                value={QRcode}
                onChange={(e) => setQRcode(e.target.value)}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddBookModal(false)}
                className="rounded-xl border px-4 py-2 font-medium hover:cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleAddBookCopyButton}
                className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700  hover:cursor-pointer"
              >
                Add Book Copy
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="absolute right-10">
        <button
          onClick={() => setShowAddBookModal(true)}
          className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 hover:cursor-pointer"
        >
          + Add Book Copy
        </button>
      </div>
      <section className="my-12 rounded-[32px] bg-gradient-to-br from-slate-900 to-indigo-900 p-8 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/10 p-3">
            <BookCopy size={28} />
          </div>

          <div>
            <p className="text-sm font-semibold text-indigo-200">Admin Panel</p>
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

                  <td className="px-6 py-5">
                    <Trash2 size={14} color="red" onClick={() => handleDeleteButton(copy.bookCopyId)}/>
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
