import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Briefcase, ShieldCheck, Search, ExternalLink, Phone, Mail, } from "lucide-react";
import Transaction from "@/models/Transaction";
import "@/models/Business";
import "@/models/User";
import { connectDB } from "@/lib/db";

export const metadata = {
    title: "Investor Dashboard | Investor Marketplace",
};

export default async function BuyerDashboard() {
    const session = await auth();
    
    // authorization guard 
    if(!session?.user) redirect("/login");
    if(session.user.role !== "buyer") redirect("/seller");

    await connectDB();
    // Fetch all completed transactions
    // Populate business and seller contact
    const unlockedConnections = await Transaction.find({
        buyerId: session.user.id,
        status: "completed",
    })
        .populate({
            path: "businessId",
            select: "title industry location price",
        })
        .populate({
            path: "sellerId",
            select: "name email phoneNumber"
        })
        .sort({ createdAt: -1 })
        .lean();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
                <p className="text-gray-600">Welcome, {session.user.name}. Manage your acquisitions and inquiries.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* main content  */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between  items-center">
                            <h2 className="text-lg font-bold text-gray-900">Unlocked Connections</h2>
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                                {unlockedConnections.length} Active
                            </span>
                        </div>

                        <div className="p-6">
                            {unlockedConnections.length === 0 ? (
                                <div className="text-center py-12">
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
                            ): (
                                <div className="space-y-4">
                                    {unlockedConnections.map((tx: any) => {
                                        const business = tx.businessId;
                                        const seller = tx.sellerId;

                                        if (!business) return null;

                                        return (
                                            <div key={tx._id.toString()} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                                    {/* Ḅusiness Info */}
                                                    <div className="flex-grow">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{business.industry}</span>
                                                            <span className="text-gray-300">•</span>
                                                            <span className="text-xs text-gray-500">{business.location}</span>
                                                        </div>
                                                        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{business.title}</h3>
                                                        <p className="text-blue-600 font-semibold mb-3">${business.price.toLocaleString()}</p>
                                                        <Link
                                                            href={`/businesses/${business._id.toString()}`}
                                                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 w-max"
                                                        >
                                                            View full listing  <ExternalLink className="h-3 w-3" />
                                                        </Link>
                                                    </div>

                                                    {/* seller contact info */}
                                                    <div className="bg-gray-50 rounded-lg p-4 md:min-w-[250px] border border-gray-100">
                                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Seller Contact</p>
                                                        <p className="font-medium text-gray-900 mb-2">{seller.name}</p>
                                                        <div className="space-y-2 text-sm text-gray-700">
                                                            <a href={`mailto:${seller.email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                                                <Mail className="h-4 w-4 text-gray-400" />
                                                                {seller.email}
                                                            </a>
                                                            <a href={`tel:${seller.phoneNumber}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                                                <Phone className="h-4 w-4 text-gray-400" />
                                                                {seller.phoneNumber || "N/A"}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
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