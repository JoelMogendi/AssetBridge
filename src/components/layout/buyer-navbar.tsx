import Link from "next/link";
import { signOut } from "@/auth";
import { Briefcase, LayoutDashboard, Search, ShieldCheck, LogOut, User as UserIcon } from "lucide-react";

export default function BuyerNavbar({ user }: { user: any }) {
    return(
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo and Buyer links */}
                    <div className="flex items-center gap-8">
                        <Link href="/seller" className="flex items-center gap-2">
                            <Briefcase className="h-6 w-6 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900 tracking-tight">
                                Investor<span className="text-blue-600">Market</span>
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/buyer" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link href="/businesses" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                <Search className="h-4 w-4" />
                                Browse Assets
                            </Link>
                            <Link href="/buyer/connections" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                <ShieldCheck className="h-4 w-4" />
                                Unlocked Contacts
                            </Link>
                        </div>
                    </div>

                    {/* User actions */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <UserIcon className="h-4 w-4 text-green-600" />
                            <span className="hidden md:inline">{user.name}</span>
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full ml-2">Buyer</span>
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