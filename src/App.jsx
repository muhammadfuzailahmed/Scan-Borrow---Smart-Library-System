import { useState } from "react";
import { BookOpen, LogIn, Eye, EyeClosed } from "lucide-react";
import Button from "./Components/Button/Button";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>

  )
}

export default App;
