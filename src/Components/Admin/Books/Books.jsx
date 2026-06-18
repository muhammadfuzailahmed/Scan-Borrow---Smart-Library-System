import {
  ActivityIcon,
  BookOpen,
  CheckCircle,
  Clock,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Books() {
  const [books, setBooks] = useState([]);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const [bookId, setBookId] = useState("");
  const [deleteBookId, setDeleteBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [deleteBookModal, setDeleteBookModal] = useState(false);
  const [bookData, setBookData] = useState({
    bookName: "",
    author: "",
    category: "",
    bookDescription: "",
  });

  const handleAddBookButton = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_ADMIN_BACKEND_URL}/add-book`,
        {
          bookData,
        },
        {
          withCredentials: true,
        },
      );
      toast.success("Book added");
      setShowAddBookModal(false);
      setBookData({
        bookName: "",
        author: "",
        category: "",
        bookDescription: "",
      });
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const handleEditBook = async (book) => {
    console.log(book);
    setShowEditBookModal(true);
    setBookId(book.bookId);
    setBookName(book.bookName);
    setAuthor(book.author);
    setCategory(book.category);
    setBookDescription(book.bookDescription);
  };

  const handleDeleteBook = async (bookId) => {
    setDeleteBookModal(true);
    setDeleteBookId(bookId);
  };

  const handleDeleteBookButton = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_ADMIN_BACKEND_URL}/delete-book`,
        {
          bookId: deleteBookId,
        },
        {
          withCredentials: true,
        },
      );
      toast.success("Book deleted");
      setDeleteBookModal(false);
      fetchBooks();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleEditBookButton = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_ADMIN_BACKEND_URL}/update-book-info`,
        {
          bookId,
          bookName,
          author,
          category,
          bookDescription,
        },
        {
          withCredentials: true,
        },
      );
      toast.success("Book info updated");
      setShowEditBookModal(false);
      fetchBooks();
    } catch (error) {
      toast.error("Error occured");
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

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8 relative">
      {deleteBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="text-right">
              <button
                onClick={() => setDeleteBookModal(false)}
                className="text-2xl font-bold text-gray-500 hover:text-black hover:cursor-pointer"
              >
                ×
              </button>
            </div>
            <div>
              <p className="font-semibold">
                Do you want to delete this book? This action will also delete
                all book copies
              </p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteBookModal(false)}
                className="rounded-xl border px-4 py-2 font-medium hover:cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteBookButton}
                className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700  hover:cursor-pointer"
              >
                Delete Book
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Add New Book</h2>

              <button
                onClick={() => setShowAddBookModal(false)}
                className="text-2xl font-bold text-gray-500 hover:text-black hover:cursor-pointer"
              >
                ×
              </button>
            </div>

            <div>
              <label className="mb-1 block font-medium">Book Name</label>
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
              <label className="mb-1 block font-medium">Author</label>
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
              <label className="mb-1 block font-medium">Category</label>
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
              <label className="mb-1 block font-medium">Description</label>
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
                onClick={handleAddBookButton}
                className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700  hover:cursor-pointer"
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Edit Book</h2>

              <button
                onClick={() => setShowEditBookModal(false)}
                className="text-2xl font-bold text-gray-500 hover:text-black hover:cursor-pointer"
              >
                ×
              </button>
            </div>

            <div>
              <label className="mb-1 block font-medium">Book Name</label>
              <input
                type="text"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Description</label>
              <textarea
                rows="4"
                value={bookDescription}
                onChange={(e) => setBookDescription(e.target.value)}
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowEditBookModal(false)}
                className="rounded-xl border px-4 py-2 font-medium hover:cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleEditBookButton}
                className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700  hover:cursor-pointer"
              >
                Update Book Info
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
            className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <BookOpen size={34} />
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950">
                      {book.bookName}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Author: {book.author}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Category: {book.category}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditBook(book)}
                      className="flex items-center gap-2 rounded-xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100 hover:cursor-pointer"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteBook(book.bookId)}
                      className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 hover:cursor-pointer"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>

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
