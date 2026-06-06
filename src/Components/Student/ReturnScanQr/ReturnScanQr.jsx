import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ReturnScanQr() {
  const scannerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const expectedTransactionCode = location.state?.transactionCode;
  const userId = JSON.parse(localStorage.getItem("currentUserId"));

  const returnBook = async (scannedTransactionCode) => {
    try {
      if (scannedTransactionCode !== expectedTransactionCode) {
        toast.error("Wrong QR code scanned");
        return;
      }

      await axios.post(`${import.meta.env.VITE_STUDENT_BACKEND_URL}/returnBook`, {
        transactionCode: scannedTransactionCode,
        userId,
      });

      toast.success("Book Returned Successfully!");
      navigate("/student/my-books");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
    }
  };

  useEffect(() => {
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
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <div className="rounded-[32px] bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-950">
          Scan Return QR
        </h1>
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