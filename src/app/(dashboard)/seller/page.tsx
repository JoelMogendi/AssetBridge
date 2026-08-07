import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import  Business  from "@/models/Business";
import { PlusCircle, Building2, TrendingUp, Users } from "lucide-react";

export const metadata = {
    title: "Seller Dashboard | Invetsor Marketplace",
};

// function statcard
function StatCard({ icon, title, value, subtitle }: { icon: React.ReactNode; title: string; value: string; subtitle?: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
            </div>
        </div>
    );
};

export default async function sellerDashboard() {
    const session = await auth();

    // authorization guard 
    if(!session?.user) redirect("/login");
    if(session.user.role !== "seller") redirect("buyer");

    // connect to db
    // fetch seller listings 
    await connectDB();
    const listings = await Business.find({ sellerId: session.user.id }).lean();


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8 py-8">

            {/* header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900"> Welcome back, {session.user.name}</h1>
                    <p className="text-gray-600">Manage your business listing and inquiries</p>
                </div>
                <Link href="/seller/new"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    <PlusCircle className="h-5 w-5" />
                    List New Business
                </Link>
            </div>

            {/* stats overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard icon={<Building2 />} title="Active Listings" value={listings.length.toString()} />
                <StatCard icon={<Users />} title="Total inquiries" value="0" subtitle="Pending feature" />
                <StatCard icon={<TrendingUp />} title="Profile views" value="0" subtitle="Pending feature" />
            </div>

            {/* Listing section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b  border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Your Listings</h2>
                </div>
            </div>

            <div className="p-6">
                {listings.length === 0 ? (
                    <div className="text-center py-12">
                        <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No businesses listed yet</h3>
                        <p className="text-gray-500 mb-6">List your first business or asset to start receiving inquiries from investors.</p>
                        <Link href="/seller/new" className="text-blue-600 font-medium hover:underline">
                            Create a listing
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listings.map((listing) => (
                            <div className="border border-gray-200 rounded-lg p-4" key={listing._id.toString()}>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                                        {listing.status.toUpperCase()}
                                    </span>
                                    <span className="text-sm font-bold text-gray-900">${listing.price.toLocaleString()}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 truncate">{listing.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{listing.location}</p>
                                <Link href={`/businesses/${listing._id.toString()}`} className="text-sm text-blue-600 hover:underline">
                                    View Listing
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
