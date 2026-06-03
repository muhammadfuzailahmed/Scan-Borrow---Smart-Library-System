import { useEffect, useState } from "react";
import axios from "axios";
import { Search, BookOpen, QrCode, X } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

function SearchBook() {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BOOKS_BACKEND_URL}/books`
      );
      setBooks(response?.data?.books || []);
    } catch (error) {
      console.log("Error fetching books", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const search = searchText.toLowerCase();

    return (
      book.bookName?.toLowerCase().includes(search) ||
      book.author?.toLowerCase().includes(search) ||
      book.category?.toLowerCase().includes(search)
    );
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-slate-950 text-center">Search Books</h1>
        <p className="mt-2 text-slate-500 text-center">
          Search available books and view QR codes of available copies.
        </p>
      </section>

      <section className="mb-8 rounded-[28px] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
          <Search size={22} className="text-slate-400" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by book name, author, or category..."
            className="w-full bg-transparent outline-none text-slate-800"
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {filteredBooks.map((book) => (
          <div
            key={book.bookId}
            className="rounded-[28px] bg-white p-6 shadow-sm border border-slate-100"
          >
            <div className="flex gap-5">
              <div className="flex h-24 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <BookOpen size={36} />
              </div>

            {/* Book Card */}
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

                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                    Total Copies: {book.totalCopies}
                  </span>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                    Available: {book.availableCopies}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedBook(book)}
                  className="mt-5 flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition hover:cursor-pointer"
                >
                  <QrCode size={18} />
                  Show Copies & QR
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white p-7 shadow-xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">
                  {selectedBook.bookName}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Available book copies and QR codes
                </p>
              </div>

              <button
                onClick={() => setSelectedBook(null)}
                className="rounded-full bg-slate-100 p-2 hover:bg-slate-200 hover:cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {selectedBook.copies?.map((copy) => (
                <div
                  key={copy.bookCopyId}
                  className={`rounded-3xl border px-5 py-6 ${
                    copy.isIssued
                      ? "border-red-100 bg-red-50"
                      : "border-emerald-100 bg-emerald-50"
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-950">
                        {copy.copyCode}
                      </p>
                      <p
                        className={`mt-1 text-sm font-semibold ${
                          copy.isIssued ? "text-red-600" : "text-emerald-700"
                        }`}
                      >
                        {copy.isIssued ? "Borrowed" : "Available"}
                      </p>
                    </div>
                  </div>

                  {copy.isIssued ? (
                    <div className="rounded-2xl bg-white p-8 text-center text-sm font-semibold text-red-600">
                      This copy is already borrowed.
                    </div>
                  ) : (
                    <div className="flex justify-center rounded-2xl bg-white p-5">
                      <QRCodeCanvas value={copy.QRcode} size={160} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default SearchBook