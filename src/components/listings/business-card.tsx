import Link from "next/link";
import { MapPin, Briefcase, TrendingUp } from "lucide-react";

// partial interface
interface BusinessCardProps {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    industry: string;
    status: string;
}

export default function BusinessCard({
    id, title, description, price, location, industry, status
}: BusinessCardProps) {
    // Truncated snippet
    const snippet = description.length > 100
        ? description.substring(0, 100) + "..."
        : description;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
           <div className="p- flex-grow">

                {/* status and industry badges */}
                <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100 flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {industry}
                    </span>
                    {status === "available" && (
                        <span className="px-2 py-1 text-green-700 bg-green-100 text-xs font-medium rounded">
                            Active
                        </span>
                    )}
                </div>

                {/* Title and price */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {title}
                </h3>
                <p className="text-2xl font-extrabold text-gray-900 mb-4">
                    ${price.toLocaleString()}
                </p>

                {/* Location and description */}
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4" />
                    {location}
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">
                    {snippet}
                </p>
            </div>

            {/* Action Button */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 mt-auto">
                <Link
                    href={`/businesses/${id}`}
                    className="w-full py-2 bg-white border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                    >
                        View Details
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                    </Link>
            </div>
        </div>
    );
};