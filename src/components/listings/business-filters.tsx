"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { Search, Filter, Loader2 } from "lucide-react";

export default function BusinessFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    // keep local state for inputs
    const [filters, setFilters] = useState({
        location: searchParams.get("location") || "",
        industry: searchParams.get("industry") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
    });

    // function to push new url
    const applyFilters = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());

        if(filters.location) params.set("location", filters.location);
        else params.delete("location");

        if(filters.industry) params.set("industry", filters.industry);
        else params.delete("industry");

        if(filters.minPrice) params.set("minPrice", filters.minPrice);
        else params.delete("minPrice");

        if(filters.maxPrice) params.set("maxPrice", filters.maxPrice);
        else params.delete("maxPrice");

        startTransition(() => {
            router.push(`/businesses?${params.toString()}`);
        });
    }, [filters, searchParams, router]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Filter className="h-5 w-5 text-blue-600" />
                <h2 className="font-bold text-gray-900">Filter Assets</h2>
            </div>
            <div  className="space-y-5">
                {/* industry filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <select
                        value={filters.industry}
                        onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:ring-2 outline-none"
                    >
                        <option value="">All Industries</option>
                        <option value="Technology">Technology & SaaS</option>
                        <option value="Agriculture">Farms & Agriculture</option>
                        <option value="Manufacturing">Manufacturing & Industrial</option>
                        <option value="Real Estate">Real Estate Joint Venture</option>
                        <option value="Retail">Retail & E-commerce</option>
                        <option value="Services">Professional Services</option>
                    </select>
                </div>

                {/* location filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">location</label>
                    <input
                        type="text"
                        placeholder="e.g Nairobi"
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* price range filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice}
                            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2">
                    <button
                        onClick={applyFilters}
                        disabled={isPending}
                        className="w-full px-3 py-2 border border-gray-900 black rounded-lg hover:bg-gray-800 transition-colors transition-duration-300ms text-sm font-medium flex justify-center items-center gap-2"
                    >
                        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                        Apply Filter
                    </button>

                    <button
                        onClick={() => {
                            setFilters({ location: "", industry: "", minPrice: "", maxPrice: "" })
                            router.push("/businesses");
                        }}
                        className="w-full mt-2  py-2 border bg-gray-100 text-gray-600 black rounded-lg hover:bg-gray-200 transition-colors transition-duration-300ms text-sm font-medium"
                    >
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    );
};