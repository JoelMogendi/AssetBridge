import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
      {/* Spinning Icon */}
      <div className="p-4 bg-blue-50 rounded-full">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
      
      {/* Pulsing Text */}
      <div className="text-center space-y-2 animate-pulse">
        <h2 className="text-xl font-bold text-gray-900">Loading details...</h2>
        <p className="text-gray-500">Securely fetching data from the marketplace.</p>
      </div>
    </div>
  );
}