"use client"; 

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 p-5 bg-red-50 rounded-full border border-red-100">
        <AlertTriangle className="h-12 w-12 text-red-500" />
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        Something went wrong
      </h1>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        We encountered an unexpected issue while trying to process your request. Our system has logged the error.
      </p>
      
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
      >
        <RefreshCcw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}