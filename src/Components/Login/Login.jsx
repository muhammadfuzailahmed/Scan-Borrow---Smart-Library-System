import React, { useState } from 'react'
import { BookOpen, LogIn, Eye, EyeClosed } from "lucide-react";
import Button from '../Button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("")
  const [passwordInputType, setPasswordInputType] = useState("password")

  const changePasswordInputType = () => {
    if(passwordInputType === "password") {
      setPasswordInputType("text")
    }else{
      setPasswordInputType("password")
    }
  }

  const handleLoginButton = async () => {
   try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        loginId,
        password
    })
    if(response?.data?.user.role === "Student") {
      localStorage.setItem("currentUserId", JSON.stringify(response?.data?.user.userId))
      navigate("/student/dashboard")
      toast.success("Login Successfull!")
      console.log(response?.data?.user)
    }else if(response?.data?.user.role === "Admin"){
      navigate("/admin/dashboard")
      toast.success("Login Successfull!")
    }
    } catch (error) {
        alert(error.response?.data?.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex items-center justify-center px-6">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[32px] shadow-xl overflow-hidden">
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-violet-600 to-indigo-700 text-white p-12">
          <div className="flex items-center gap-3">
            <BookOpen size={36} />
            <h1 className="text-3xl font-bold">ScanBorrow</h1>
          </div>

          <div>
            <h2 className="text-5xl font-bold leading-tight">
              QR-Based Library Borrowing System
            </h2>
            <p className="mt-5 text-lg text-violet-100 max-w-md">
              Students can borrow books digitally by scanning the QR code placed
              on each book copy.
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-10">
            <div className="lg:hidden flex items-center gap-3 mb-6 text-indigo-700">
              <BookOpen size={32} />
              <h1 className="text-2xl font-bold">ScanBorrow</h1>
            </div>

            <h2 className="text-4xl font-bold text-slate-900">Login</h2>
            <p className="mt-3 text-slate-500">
              Enter your ID and password to continue.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Login ID
              </label>
              <input
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="Enter login ID"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-slate-800 outline-none focus:border-indigo-500 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
              <input
                type={passwordInputType}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-slate-800 outline-none focus:border-indigo-500 focus:ring-indigo-100"
              />
              <div className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2">
              {
                passwordInputType === "password" ?
                <Eye onClick={changePasswordInputType} size={24}/>
                :
                <EyeClosed onClick={changePasswordInputType} size={24}/>
              }
              </div>
              </div>
            </div>
            <Button onClick={handleLoginButton} icon={<LogIn size={20} />} title={"Login"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login