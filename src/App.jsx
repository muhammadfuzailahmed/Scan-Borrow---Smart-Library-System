import { useState } from "react";
import { BookOpen, LogIn, Eye, EyeClosed } from "lucide-react";
import Button from "./Components/Button/Button";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import StudentLayout from "./Components/Student/Layout/Layout"
import StudentDashboard from "./Components/Student/Dashboard/Dashboard"
import SearchBook from "./Components/Student/SearchBook/SearchBook";
import ScanQR from "./Components/Student/ScanQR/ScanQR";

function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Login />} />

    <Route path="/student" element={<StudentLayout />}>
      <Route path="dashboard" element={<StudentDashboard />}/>
      <Route path="search-books" element={<SearchBook />}/>
      <Route path="scan-qr" element={<ScanQR />} />
    </Route>

    </Routes>
    </>

  )
}

export default App;
