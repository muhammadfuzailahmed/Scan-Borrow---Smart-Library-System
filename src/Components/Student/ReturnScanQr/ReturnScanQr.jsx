import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { X, Check, Search, House } from "lucide-react";
import Button from "../../Button/Button";

function ReturnScanQr() {
  const scannerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const expectedTransactionCode = location.state?.transactionCode;
  const userId = JSON.parse(localStorage.getItem("currentUserId"));
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookData, setBookData] = useState({});

  const returnBook = async (scannedTransactionCode) => {
    try {
      if (scannedTransactionCode !== expectedTransactionCode) {
        toast.error("Wrong QR code scanned");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_STUDENT_BACKEND_URL}/returnBook`,
        {
          transactionCode: scannedTransactionCode,
          userId,
        },
        {
          withCredentials: true
        }
      );

      toast.success("Book Returned Successfully!");
      // navigate("/student/my-books");
      setBookData(response?.data?.bookInfo);
      setShowSuccessModal(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
    }
  };

  const formatDate = (date) => {
    if (!date) return "No Borrowed Books";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleCloseShowSuccessModalButton = () => {
    setShowSuccessModal(false);
  };

  const handleSearchButon = () => {
    navigate("/student/search-books")
  }

  const handleDashboardButon = () => {
    navigate("/student/dashboard")
  }

  useEffect(() => {
    if(showSuccessModal) return;

    const scanner = new Html5Qrcode("return-qr-reader");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          console.log("Scanned return QR:", decodedText);

          await scanner.stop();
          await returnBook(decodedText);
        },
      )
      .catch((error) => {
        console.log("Camera error:", error);
        toast.error("Camera could not start");
      });

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop();
      }
    };
  }, [showSuccessModal]);

  return showSuccessModal ? (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[30vw] py-8 bg-gray-100 rounded-md z-10">
        <div
          onClick={handleCloseShowSuccessModalButton}
          className="absolute right-2 top-2"
        >
          <X size={22} />
        </div>
        <div className="mt-12">
          <div className="flex items-center justify-center">
            <Check size={38} color="green" strokeWidth={5} />
          </div>
          <div>
            <p className="text-green-500 text-lg font-bold text-center mt-2">
              Book Returned Successfully!
            </p>
            <p className="mt-1 text-center">
              The book has been returned successfully!
            </p>
            <div className="flex items-center justify-between px-1 py-2 border-b-2 border-b-gray-300 w-[90%] mx-auto">
              <p className="font-semibold">Transaction Code</p>
              <p>{bookData?.transactionCode}</p>
            </div>

            {/* <div className="flex items-center justify-between px-1 py-2 border-b-2 border-b-gray-300 w-[90%] mx-auto">
                  <p className="font-semibold">Book Name</p>
                  <p>{bookName}</p>
                </div>*/}

            <div className="flex items-center justify-between px-1 py-2 border-b-2 border-b-gray-300 w-[90%] mx-auto">
              <p className="font-semibold">Issue Date</p>
              <p>{formatDate(bookData?.issueDate)}</p>
            </div>

            <div className="flex items-center justify-between px-1 py-2 border-b-2 border-b-gray-300 w-[90%] mx-auto">
              <p className="font-semibold">Due Date</p>
              <p>{formatDate(bookData?.dueDate)}</p>
            </div>

            <div className="flex items-center justify-between px-1 py-2 border-b-2 border-b-gray-300 w-[90%] mx-auto">
              <p className="font-semibold">Return Date</p>
              <p>{formatDate(bookData?.returnDate)}</p>
            </div>

            {bookData?.fineAmount == 0 ? (
              <div className="bg-green-100 w-[90%] mx-auto mt-4 p-1 rounded-sm">
                <p className="text-green-500 text-center">No fee charged</p>
              </div>
            ) : (
              <div className="bg-red-100 w-[90%] mx-auto mt-4 p-1 rounded-sm">
                <p className="text-red-500">
                  Due date passed. Fine charged Rs.{" "}
                  {bookData?.fineAmount}
                </p>
              </div>
            )}

            <div className="flex items-center gap-4 w-[90%] mx-auto mt-6">
              <Button
                onClick={handleSearchButon}
                icon={<Search size={26} />}
                title="Search Books"
              />
              <Button
                onClick={handleDashboardButon}
                icon={<House size={26} />}
                title="Dashboard"
              />
            </div>
          </div>
        </div>
      </div>
  ) : (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <div className="rounded-[32px] bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-950">Scan Return QR</h1>
        <p className="mt-2 text-slate-500">
          Scan the return QR code to confirm this book return.
        </p>

        <div
          id="return-qr-reader"
          className="mt-6 min-h-[320px] overflow-hidden rounded-3xl border border-slate-200"
        />
      </div>
    </main>
  );
}

export default ReturnScanQr;
