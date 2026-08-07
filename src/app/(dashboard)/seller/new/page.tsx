import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SellerUploadForm from "@/components/forms/seller-upload-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { title } from "process";

export const metadata = {
    title: "List a New Asset | Seller Portal",
};

export default async function NewListingPage() {
    const session = await auth();

    if(!session?.user) redirect("login");
    if(session.user.role !== "seller") redirect("/buyer");

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Nav and header */}
            <div className="mb-8">
                <Link
                    href="/seller"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 trasition-colors mb-4"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">List a New Asset</h1>
                <p className="text-gray-600 mt-2">
                    Provide accurate details about your business to attract serious investors.
                </p>
            </div>
            <SellerUploadForm />
        </div>
    );
};