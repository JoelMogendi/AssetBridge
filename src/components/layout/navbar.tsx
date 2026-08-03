import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Briefcase, User as UserIcon, LogOut, LayoutDashboard  } from "lucide-react";

export default async function Navbar() {
    // fetch session
    const session = await auth();

    return (
        <nav className="sticky top-0 z-50 w-full bg-white border border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* primary nav */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <Briefcase className="h-6 w-6 text-blue-600" />
                            <span className=""></span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};