import { useState } from "react";
import { instructions } from "../constants/instructions";
import Steps from "./Steps";
import QRCode from "react-qr-code";

const Instructions = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (copied) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.origin).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        });
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = window.location.origin;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      setCopied(true);
      document.body.removeChild(textArea);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Instructions</h1>
      <div className="container mx-auto p-4">
        <div className="w-full px-2">
          <div className="flex items-center justify-center p-4">
            <QRCode value={window.location.origin} className="border-2" />
          </div>
          <div className="flex w-full py-4 border-b-2 px-4 border-emerald-950 justify-between items-center bg-white rounded relative">
            <p className="text-black font-regular text-lg">
              {window.location.origin}
            </p>
            <button
              onClick={handleCopy}
              className="rounded-r bg-emerald-500 h-15 absolute right-0 w-40 text-2xl font-bold cursor-pointer"
            >
              {!copied ? (
                <i className="ri-file-copy-line"></i>
              ) : (
                <i className="ri-check-double-line"></i>
              )}{" "}
              Copy
            </button>
          </div>
          {instructions.map((step) => (
            <Steps key={step} step={step} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructions;
