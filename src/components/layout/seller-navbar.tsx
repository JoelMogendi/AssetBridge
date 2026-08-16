"use client";

import { useState } from "react";
import Link from "next/link";
import { handleSignOut } from "@/app/actions/auth-action";
import { Briefcase, LayoutDashboard, PlusCircle, Inbox, LogOut, User as UserIcon, Menu, X } from "lucide-react";

export default function SellerNavbar({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/seller" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Seller<span className="text-blue-600">Portal</span>
            </span>
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/seller" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
            <Link href="/seller/new" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              <PlusCircle className="h-4 w-4" /> List Asset
            </Link>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <UserIcon className="h-4 w-4 text-blue-600" />
              <span>{user.name}</span>
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full ml-2">Seller</span>
            </div>
            <div className="h-5 w-px bg-gray-200"></div>
            <form action={handleSignOut}>
              <button type="submit" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </form>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <div className="flex items-center gap-2 px-3 py-3 border-b border-gray-100 mb-2">
              <UserIcon className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-900">{user.name}</span>
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full ml-auto">Seller</span>
            </div>
            
            <Link 
              href="/seller" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
            >
              <LayoutDashboard className="h-5 w-5" /> Dashboard
            </Link>
            
            <Link 
              href="/seller/new" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
            >
              <PlusCircle className="h-5 w-5" /> List New Asset
            </Link>

            <form action={handleSignOut} className="pt-2 mt-2 border-t border-gray-100">
              <button type="submit" className="w-full flex items-center gap-3 px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-md">
                <LogOut className="h-5 w-5" /> Sign Out
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}