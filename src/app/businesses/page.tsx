import { connectDB } from "@/lib/db";
import Business from "@/models/Business";
import BusinessCard from "@/components/listings/business-card";
import { Search } from "lucide-react";
import BusinessFilters from "@/components/listings/business-filters";

export const metadata = {
    title: "Browse Business & Assets | Investor MarketPlace",
    description: "Discovver profitable businesses, farms and real estate joint ventures for sale."
};

export default async function BusinessesPage({
    searchParams,
}: {
    searchParams: Promise<{ industry?: string; location?: string; minPrice?: string, maxPrice?: string; }>
}) {
    await connectDB();

    const resolvedParams = await searchParams;

    const query: Record<string, any> = { status: "available" };

    if(resolvedParams.industry) {
        query.industry = { $regex: resolvedParams.industry, $options: "i" };
    };

    if(resolvedParams.location) {
        query.location = { $regex: resolvedParams.location, $options: "i" };
    };

    // handle price range logic
    if(resolvedParams.minPrice || resolvedParams.maxPrice ) {
        query.price = {};
        if(resolvedParams.minPrice) query.price.$gte = Number(resolvedParams.minPrice);
        if(resolvedParams.maxPrice) query.price.$lte = Number(resolvedParams.maxPrice);
    };

    // fetch data sorted newest to first 
    const  businesses  = await Business.find(query).sort({ createdAt: -1 }).lean();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* header */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                    Available Investment Opportunities
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Browse verified  listings. From tech startups and manufacturing plants to high-yield agricultural plots.
                </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* filter sidebar */}
                <aside className="flex-1">
                    <BusinessFilters />
                </aside>
                {/* grid display */}
                <main className="w-full lg:w-3/4">
                    {businesses.length ===0 ? (
                        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                            <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No listing found</h3>
                            <p className="text-gray-500">
                                There are currently no active businesses matching your criteria. Please check back later or request.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {businesses.map((business: any) => (
                                <BusinessCard
                                    key={business._id.toString()}
                                    id={business._id.toString()}
                                    title={business.title}
                                    description={business.description}
                                    price={business.price}
                                    location={business.location}
                                    industry={business.industry}
                                    status={business.status}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};