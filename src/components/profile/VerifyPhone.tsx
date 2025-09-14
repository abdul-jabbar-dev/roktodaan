"use client";
import React, { useState, useEffect } from "react";
import { Check, MessageCircleCode, Send } from "lucide-react";
import API from "@/api";

const VerifyPhone = ({ phoneNumber }: { phoneNumber: string }) => {
  const [step, setStep] = useState<"initial" | "otp">("initial");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Auto hide message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const sendCode = async () => {
    setStep("otp"); // demo only
    setMessage({ type: "success", text: `OTP sent to ${phoneNumber}` });
  };

  const verifyCode = async () => {
    if (!code) {
      setMessage({ type: "error", text: "Please enter the OTP!" });
      return;
    }
    setMessage({ type: "success", text: "Phone verified successfully ✅" });
    setStep("initial");
    setCode("");
  };

  return (
    <div className="bg-gray-50 border flex flex-col border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-sm w-1/2 ">
      {/* Header */}
      <div className="flex items-center mb-2">
        <MessageCircleCode className="h-4 w-4 mr-2 text-gray-600" />
        <h3 className="font-semibold text-md">Phone Verification</h3>
      </div>

      {/* Content */}
      {step === "initial" && (
        <div className="space-y-2">
          <p className="text-clip text-gray-600">
            Verify your phone number <span className="font-medium text-md ">{phoneNumber}</span> for account security.
          </p>
          <p className="text-xs p-1 text-red-400">
            "কারো রক্ত প্রয়োজন হলে আপনার সাথে এই নম্বরে যোগাযোগ করবে। <br /> তাই নম্বরটি সবসময় কাছে রাখুন এবং এখনই নম্বরটি যাচাই করুন।"
          </p>
          <button
            onClick={sendCode}
            className="flex items-center justify-center space-x-1 bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm transition-all"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Send OTP</span>
          </button>
        </div>
      )}

      {step === "otp" && (
        <div className="space-y-2">
          <p className="text-clip text-gray-600">
            OTP sent to <span className="font-medium text-md px-1">{phoneNumber}</span>. Enter below:
          </p>
          <div className="flex space-x-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter OTP"
              className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              onClick={verifyCode}
              className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-sm transition-all"
            >
              <Check className="h-3.5 w-3.5 mr-1" />
              Verify
            </button>
          </div>
        </div>
      )}

      {/* Message */}
      {message && (
        <p
          className={`mt-2 text-xs ${message.type === "success" ? "text-green-600" : "text-red-500"
            }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default VerifyPhone;
