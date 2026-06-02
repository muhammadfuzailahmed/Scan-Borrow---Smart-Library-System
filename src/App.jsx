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
import History from "./Components/Student/History/History";
import AdminLayout from "./Components/Admin/Layout/Layout";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import Transactions from "./Components/Admin/Transactions/Transactions";

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
      <Route path="history" element={<History />} />
    </Route>

    <Route path="/Admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<Dashboard />}/>
      <Route path="transactions" element={<Transactions />}/>
    </Route>

    </Routes>
    </>

  )
}

export default App;
