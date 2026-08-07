import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Briefcase, ShieldCheck, Search, } from "lucide-react";

export const metadata = {
    title: "Investor Dashboard | Invetsor Marketplace",
};

export default async function BuyerDashboard() {
    const session = await auth();
    
    // authorization guard 
    if(!session?.user) redirect("/login");
    if(session.user.role !== "buyer") redirect("seller");

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* ḥeader */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
                <p className="text-gray-600">Welcome, {session.user.name}. Manage your acquisitions and inquiries.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* main content  */}
                <div className="lg:cols-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900">Unlocked Connections</h2>
                        </div>

                        <div className="p-6 text-center py-12">
                            <ShieldCheck className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No connections yet</h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                When you pay the connection fee to the seller via mobile money you'll unlock his contact details and financial records.
                            </p>
                            <Link
                                href="/businesses"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                            >
                                <Search className="h-4 w-4" />
                                Browse Businesses
                            </Link>
                        </div>
                    </div>
                </div>

                {/* sidebar actions */}
                <div className="space-y-6">
                    {/* Post request CTA */}
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <Briefcase className="h-8 w-8 text-blue-600 mb-4" />
                        <h3 className="font-bold text-gray-900 mb-2"> Can't find what you need?</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Post a custom request for a specific business, farm or joint venture. Verified sellers will contact you if they have a match.
                        </p>
                        <button className="w-full py-2 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                            Post a Request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};