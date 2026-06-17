import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import axios from "axios";
import { toast } from "react-toastify";
import { X, Check, Search, House } from "lucide-react";
import Button from "../../Button/Button"
import { useNavigate } from "react-router-dom";

function ScanQR() {
  const scannerRef = useRef(null);
  const navigate = useNavigate();
  const [scannedValue, setScannedValue] = useState("");
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("currentUserId")))
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookData, setBookData] = useState({});
  const [bookCopyCode, setBookCopyCode] = useState("")
  const [bookName, setBookName] = useState("")

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    const issueBook = async (QRcode) => {
        try {
           const response =  await axios.post(`${import.meta.env.VITE_STUDENT_BACKEND_URL}/borrow`, 
                {
                    userId,
                    QRcode
                },
                {
                  withCredentials: true
                }
            )
            setBookData(response?.data?.borrowedBook)
            setBookCopyCode(response?.data?.bookCopyCode)
            setBookName(response?.data?.bookName)
            setShowSuccessModal(true)
            toast.success("Book Borrowed Succesfully!")
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

    scanner
  .start(
    { facingMode: { exact: "environment" } },
    {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    },
    (decodedText) => {
      setScannedValue(decodedText);
      issueBook(decodedText);
      scanner.stop();
    }
  )
  .catch((error) => {
    console.log("Back camera failed:", error);

    scanner
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          console.log(`Scanned QR:, ${decodedText}`);
          setScannedValue(decodedText);
          scanner.stop();
        }
      )
      .catch((secondError) => {
        console.log("Camera start error:", secondError);
        alert(secondError);
      });
  });

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop();
      }
    };
  }, []);

  const handleCloseShowSuccessModalButton = () => {
    setShowSuccessModal(false)
  }

  const handleSearchButon = () => {
    navigate("/student/search-books")
  }

  const handleDashboardButon = () => {
    navigate("/student/dashboard")
  }

  const formatDate = (date) => {
  if (!date) return "No Borrowed Books";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <div>
        {
          showSuccessModal
          &&
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[30vw] py-8 bg-gray-100 rounded-md z-10">
            <div onClick={handleCloseShowSuccessModalButton} className="absolute right-2 top-2">
              <X size={22} />
            </div>
            <div className="mt-12">
              <div className="flex items-center justify-center">
                <Check size={38} color="green" strokeWidth={5}/>
              </div>
              <div>
                <p className="text-green-500 text-lg font-bold text-center mt-2">Book Borrowed Successfully!</p>
                <p className="mt-1 text-center">The book has been issued to you</p>
                <div className="flex items-center justify-between px-1 py-2 border-b-2 border-b-gray-300 w-[90%] mx-auto">
                  <p className="font-semibold">Transaction Code</p>
                  <p>{bookData?.transactionCode}</p>
                </div>

              <div className="flex items-center justify-between px-1 py-2 border-b-2 border-b-gray-300 w-[90%] mx-auto">
                  <p className="font-semibold">Book Name</p>
                  <p>{bookName}</p>
                </div>

                <div className="flex items-center justify-between px-1 py-2 border-b-2 border-b-gray-300 w-[90%] mx-auto">
                  <p className="font-semibold">Copy Code</p>
                  <p>{bookCopyCode}</p>
                </div>

                <div className="flex items-center justify-between px-1 py-2 border-b-2 border-b-gray-300 w-[90%] mx-auto">
                  <p className="font-semibold">Issue Date</p>
                  <p>{formatDate(bookData?.issueDate)}</p>
                </div>

                <div className="flex items-center justify-between px-1 py-2 border-b-2 border-b-gray-300 w-[90%] mx-auto">
                  <p className="font-semibold">Due Date</p>
                  <p>{formatDate(bookData?.dueDate)}</p>
                </div>

                <div className="bg-green-100 w-[90%] mx-auto mt-4 p-1 rounded-sm">
                  <p className="text-green-500">Tip: Please return the book on or before due date to avoid any late fines</p>
                </div>

                <div className="flex items-center gap-4 w-[90%] mx-auto mt-6">
                  <Button onClick={handleSearchButon} icon={<Search size={26}/>} title="Search Books"/>
                  <Button onClick={handleDashboardButon} icon={<House size={26}/>} title="Dashboard"/>
                </div>

              </div>
            </div>
          </div>
        }
      </div>
      <div className="rounded-[32px] bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-950">Scan Book QR</h1>
        <p className="mt-2 text-slate-500">
          Point your mobile camera at the QR code shown on the book copy.
        </p>

        <div
          id="qr-reader"
          className="mt-6 min-h-[320px] overflow-hidden rounded-3xl border border-slate-200"
        />

        {scannedValue && (
          <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-700">
              QR Scanned Successfully
            </p>
            <p className="mt-1 font-mono text-sm text-slate-700">
              {scannedValue}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default ScanQR;
