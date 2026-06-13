import { CheckCircle, History, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ADMIN_BACKEND_URL}/admin-transactions-data`,
      );

      setTransactions(response?.data?.transactions || []);
    } catch (error) {
      console.log("Error fetching transactions", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main className="mx-auto max-w-8xl px-6 py-8">
      <section className="mb-6 rounded-[32px] bg-gradient-to-br from-slate-900 to-indigo-900 p-8 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/10 p-3">
            <History size={28} />
          </div>

          <div>
            <p className="text-sm font-semibold text-indigo-200">
              Admin Panel
            </p>
            <h1 className="text-4xl font-bold">Borrow Transactions</h1>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-slate-300">
          View all book borrowing records, including student details, issued
          copies, transaction codes, issue dates, and due dates.
        </p>
      </section>

      <section className="rounded-[32px] bg-white p-6 shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-950">
            All Transactions
          </h2>
          <p className="text-sm text-slate-500">
            Complete history of issued book records.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <table className="w-full min-w-[1050px] text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Transaction
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Student
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Book
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Copy Code
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Issue Date
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Due Date
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Fine
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item) => (
                <tr
                  key={item.transactionCode}
                  className="border-b border-slate-100 transition hover:bg-slate-50 hover:cursor-pointer"
                >
                  <td className="px-6 py-5 font-mono text-sm font-semibold text-indigo-600">
                    {item.transactionCode}
                  </td>

                  <td className="px-6 py-5">
                    <p className="font-semibold text-slate-900">
                      {item.studentName}
                    </p>
                    <p className="text-xs text-slate-500">{item.loginId}</p>
                  </td>

                  <td className="px-6 py-5 font-semibold text-slate-900">
                    {item.bookName}
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {item.copyCode}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-600">
                    {formatDate(item.issueDate)}
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-600">
                    {formatDate(item.dueDate)}
                  </td>

                  {
                    item.book_status === 'RETURNED' ? (
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      <CheckCircle size={14} />
                      {item.book_status}
                    </span>
                  </td>
                    )
                    :
                    (
                      <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500">
                      <CircleAlert size={14} />
                      {item.book_status}
                    </span>
                  </td>
                    )
                  }

                  {
                    item.fineAmount === 0 ? (
                  <td className="px-6 py-5 text-sm text-green-600 font-semibold">
                    Rs. {item.fineAmount}
                  </td>
                    )
                    :
                    (
                      <td className="px-6 py-5 text-sm text-red-600 font-semibold">
                    Rs. {item.fineAmount}
                  </td>
                    )
                  }
                </tr>
              ))}
            </tbody>
          </table>

          {transactions.length === 0 && (
            <div className="p-8 text-center">
              <p className="font-semibold text-slate-700">
                No transactions found.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Transactions;