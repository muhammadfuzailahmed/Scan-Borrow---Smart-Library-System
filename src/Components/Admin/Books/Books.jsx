import { BookOpen, CheckCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ADMIN_BACKEND_URL}/admin-book-details`,
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
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section className="mb-6 rounded-[32px] bg-gradient-to-br from-slate-900 to-indigo-900 p-8 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/10 p-3">
            <BookOpen size={28} />
          </div>

          <div>
            <p className="text-sm font-semibold text-indigo-200">
              Admin Panel
            </p>
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