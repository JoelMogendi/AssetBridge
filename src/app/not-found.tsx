import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 p-6 bg-gray-50 rounded-full border border-gray-100">
        <SearchX className="h-16 w-16 text-gray-400" />
      </div>
      
      <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
        Asset Not Found
      </h1>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        We couldn't find the page or listing you were looking for. It may have been removed by the seller or the URL might be incorrect.
      </p>
      
      <Link 
        href="/businesses" 
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Return to Marketplace
      </Link>
    </div>
  );
}