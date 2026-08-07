import Link from "next/link";
import { signOut } from "@/auth";
import { Briefcase, LayoutDashboard, PlusCircle, Inbox, LogOut, User as UserIcon } from "lucide-react";

export default function SellerNavbar({ user }: { user: any }) {
    return(
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo and seller links */}
                    <div className="flex items-center gap-8">
                        <Link href="/seller" className="flex items-center gap-2">
                            <Briefcase className="h-6 w-6 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900 tracking-tight">
                                Seller<span className="text-blue-600">Portal</span>
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/seller" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link href="/seller/new" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                <PlusCircle className="h-4 w-4" />
                                List Asset
                            </Link>
                            <Link href="/seller/inquiries" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                <Inbox className="h-4 w-4" />
                                Inquiries
                            </Link>
                        </div>
                    </div>

                    {/* User actions */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <UserIcon className="h-4 w-4 text-blue-600" />
                            <span className="hidden md:inline">{user.name}</span>
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full ml-2">Seller</span>
                        </div>
                        
                        <div className="h-5 w-px bg-gray-200 hidden md:block"></div>

                        <form action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/login"});
                        }}>
                            <button type="submit" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
                                <LogOut className="h-4 w-4" />
                                <span className="hidden md:inline">Sign Out</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
};