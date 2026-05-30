import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import axios from "axios";
import { toast } from "react-toastify";

function ScanQR() {
  const scannerRef = useRef(null);
  const [scannedValue, setScannedValue] = useState("");
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("currentUserId")))

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    const issueBook = async (QRcode) => {
        try {
           const response =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/borrow`, 
                {
                    userId,
                    QRcode
                }
            )
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

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
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
