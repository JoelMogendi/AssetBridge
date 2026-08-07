// src/components/layout/public-navbar.tsx
import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function PublicNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Investor<span className="text-blue-600">Market</span>
            </span>
          </Link>

          {/* Public Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="#businesses" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Marketplace
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              How it Works
            </Link>
          </div>

          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Account
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}