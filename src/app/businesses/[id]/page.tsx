import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import Business from "@/models/Business";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import FreeUnlockButton from "@/components/listings/free-unlock";
import { MapPin, Briefcase, Building2, Phone, Mail, Lock, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function BusinessDetailPage({ params }: { params: Promise<{ id: string }> }) {

  const resolvedParams = await params;
  await connectDB();

  // 1. Fetch the business and populate the seller's name
  const business = await Business.findById(resolvedParams.id).populate("sellerId", "name").lean();
  
  if (!business) return notFound();

  const session = await auth();
  let isUnlocked = false;
  let sellerContact: any = null;

  // 2. Check Unlock Status
  if (session?.user) {
    const isOwner = business.sellerId._id.toString() === session.user.id;
    
    if (isOwner) {
      isUnlocked = true;
    } else {
      const tx = await Transaction.findOne({
        buyerId: session.user.id,
        businessId: business._id,
        status: "completed"
      }).lean();
      
      if (tx) isUnlocked = true;
    }

    // 3. Fetch private contact info only if unlocked
    if (isUnlocked) {
      const seller = await User.findById(business.sellerId._id).select("email phoneNumber").lean();
      sellerContact = { email: seller?.email, phone: (seller as any)?.phoneNumber };
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Back Button */}
      <Link href="/businesses" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Marketplace
      </Link>

      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-bold rounded-full flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            {business.industry}
          </span>
          <span className="flex items-center gap-1 text-gray-500 text-sm">
            <MapPin className="h-4 w-4" />
            {business.location}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{business.title}</h1>
        <p className="text-3xl font-bold text-gray-900 mb-8">${business.price.toLocaleString()}</p>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3">About this Asset</h2>
        <div className="prose max-w-none text-gray-600">
          <p className="whitespace-pre-wrap">{business.description}</p>
        </div>
      </div>

      {/* Seller Contact Section */}
      <div className="bg-gray-900 rounded-xl shadow-sm p-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="h-8 w-8 text-blue-400" />
          <h2 className="text-2xl font-bold">Seller Information</h2>
        </div>

        {isUnlocked ? (
          <div className="space-y-4 bg-gray-800 p-6 rounded-lg border border-gray-700">
            <p className="text-gray-300">Listed by: <span className="text-white font-medium">{business.sellerId.name}</span></p>
            <div className="flex items-center gap-3 text-blue-400">
              <Mail className="h-5 w-5" />
              <a href={`mailto:${sellerContact?.email}`} className="hover:underline">{sellerContact?.email}</a>
            </div>
            <div className="flex items-center gap-3 text-green-400">
              <Phone className="h-5 w-5" />
              <a href={`tel:${sellerContact?.phone}`} className="hover:underline">{sellerContact?.phone || "Not provided"}</a>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-800 rounded-lg border border-gray-700">
            <Lock className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Contact Details Locked</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {session?.user 
                ? "Unlock this listing to communicate directly with the seller and negotiate terms."
                : "Please log in as an investor to unlock seller contact details."}
            </p>
            
            {session?.user?.role === "buyer" && (
              <FreeUnlockButton 
                businessId={business._id.toString()} 
                sellerId={business.sellerId._id.toString()} 
              />
            )}
          </div>
        )}
      </div>

    </div>
  );
}