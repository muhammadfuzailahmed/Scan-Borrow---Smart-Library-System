import { useState } from "react";
import { BookOpen, LogIn, Eye, EyeClosed } from "lucide-react";
import Button from "./Components/Button/Button";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import StudentLayout from "./Components/Student/Layout/Layout"
import StudentDashboard from "./Components/Student/Dashboard/Dashboard"
import SearchBook from "./Components/Student/SearchBook/SearchBook";
import ScanQR from "./Components/Student/ScanQR/ScanQR";
import MyBooks from "./Components/Student/MyBooks/MyBooks";
import ScanReturnQr from "./Components/Student/ReturnScanQr/ReturnScanQr.jsx"
import History from "./Components/Student/History/History";
import AdminLayout from "./Components/Admin/Layout/Layout";
import AdminDashboard from "./Components/Admin/Dashboard/Dashboard";
import AdminTransactions from "./Components/Admin/Transactions/Transactions";
import AdminBooks from "./Components/Admin/Books/Books";
import AdminBookCopies from "./Components/Admin/BookCopies/BookCopies";
import AdminReports from "./Components/Admin/Reports/Reports.jsx"

function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Login />} />

    <Route path="/student" element={<StudentLayout />}>
      <Route path="dashboard" element={<StudentDashboard />}/>
      <Route path="search-books" element={<SearchBook />}/>
      <Route path="scan-qr" element={<ScanQR />} />
      <Route path="my-books" element={<MyBooks />} />
      <Route path="scan-return" element={<ScanReturnQr />} />
      <Route path="history" element={<History />} />
    </Route>

    <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<AdminDashboard />}/>
      <Route path="transactions" element={<AdminTransactions />}/>
      <Route path="books" element={<AdminBooks />}/>
      <Route path="book-copies" element={<AdminBookCopies />}/>
      <Route path="reports" element={<AdminReports />}/>
    </Route>

    </Routes>
    </>

  )
}

export default App;
