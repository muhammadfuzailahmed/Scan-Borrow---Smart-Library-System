import { BookOpen, CheckCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  const [bookData, setBookData] = useState({
    bookName: "",
    author: "",
    category: "",
    bookDescription: "",
  });

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

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 relative">
      {
  showAddBookModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Add New Book
          </h2>

          <button
            onClick={() => setShowAddBookModal(false)}
            className="text-2xl font-bold text-gray-500 hover:text-black hover:cursor-pointer"
          >
            ×
          </button>
        </div>

        <form className="space-y-4">

          <div>
            <label className="mb-1 block font-medium">
              Book Name
            </label>
            <input
              type="text"
              value={bookData.bookName}
              onChange={(e) =>
                setBookData({
                  ...bookData,
                  bookName: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Author
            </label>
            <input
              type="text"
              value={bookData.author}
              onChange={(e) =>
                setBookData({
                  ...bookData,
                  author: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Category
            </label>
            <input
              type="text"
              value={bookData.category}
              onChange={(e) =>
                setBookData({
                  ...bookData,
                  category: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Description
            </label>
            <textarea
              rows="4"
              value={bookData.bookDescription}
              onChange={(e) =>
                setBookData({
                  ...bookData,
                  bookDescription: e.target.value,
                })
              }
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
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700  hover:cursor-pointer"
            >
              Add Book
            </button>

          </div>

        </form>
      </div>
    </div>
  )
}
      <div className="absolute right-10">
        <button
          onClick={() => setShowAddBookModal(true)}
          className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 hover:cursor-pointer"
        >
          + Add Book
        </button>
      </div>
      <section className="my-12 rounded-[32px] bg-gradient-to-br from-slate-900 to-indigo-900 p-8 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/10 p-3">
            <BookOpen size={28} />
          </div>

          <div>
            <p className="text-sm font-semibold text-indigo-200">Admin Panel</p>
            <h1 className="text-4xl font-bold">Books Catalogue</h1>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-slate-300">
          View all library books with total, available, and issued copy counts.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {books.map((book) => (
          <div
            key={book.bookId}
            className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="flex gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <BookOpen size={34} />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  {book.bookName}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Author: {book.author}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Category: {book.category}
                </p>

                <p className="mt-3 text-sm text-slate-600">
                  {book.bookDescription}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-500">
                      Total Copies
                    </p>
                    <p className="mt-1 text-2xl font-bold text-slate-950">
                      {book.totalCopies}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <div className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle size={15} />
                      <p className="text-xs font-semibold">Available</p>
                    </div>
                    <p className="mt-1 text-2xl font-bold text-emerald-700">
                      {book.availableCopies}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-orange-50 p-4">
                    <div className="flex items-center gap-1 text-orange-700">
                      <Clock size={15} />
                      <p className="text-xs font-semibold">Issued</p>
                    </div>
                    <p className="mt-1 text-2xl font-bold text-orange-700">
                      {book.issuedCopies}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {books.length === 0 && (
          <div className="rounded-[28px] bg-white p-8 text-center shadow-sm">
            <p className="font-semibold text-slate-700">No books found.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Books;
