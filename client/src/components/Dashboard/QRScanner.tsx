import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanFailure?: (error: string) => void;
}

const QRScanner = ({ onScanSuccess, onScanFailure }: QRScannerProps) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch((error) => console.error("Failed to clear scanner", error));
    };
  }, [onScanSuccess, onScanFailure]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div id="qr-reader" className="rounded-xl overflow-hidden border-2 border-slate-200"></div>
    </div>
  );
};

export default QRScanner;
