"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { title } from "process";

// Define zod schema
const businessSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters for clarity"),
    price: z.number("Price is required").positive("Price must be a postive number"),
    location: z.string().min(2, "Location is required"),
    industry: z.string().min(2, "Please select an industry"),
});

type BusinessFormValues = z.infer<typeof businessSchema>;

export default function SellerUploadForm() {
    const router = useRouter();
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm<BusinessFormValues>({
        resolver: zodResolver(businessSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            location: "",
            industry: "",
        },
    });

    const onSubmit = async (data: BusinessFormValues) => {
        setIsLoading(true);
        setGlobalError(null);

        try {
             const response = await fetch("/api/businesses", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
             });

             const result = await response.json();

             if(!response.ok) {
                setGlobalError(result.error || "Failed to create listing.");
             } else {
                // redirect seller back to dashboard
                router.push("/seller");
                router.refresh();
             }
        } catch (error) {
            setGlobalError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            {globalError && (
                <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200 ">
                    {globalError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business or Asset Title</label>
                    <input
                        {...register("title")}
                        disabled={isLoading}
                        className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 transition-colors ${
                            errors.title ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                    placeholder="e.g Profitable E-commerce Store"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
                </div>

                {/* Industry and Price  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                        <select
                            {...register("industry")}
                            disabled={isLoading}
                            className={`w-full px-4 py-2 border bg-white rounded-lg outline-none focus:ring-2 transition-colors ${
                                errors.industry ? "border-red-500 focus-ring-red-200" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"    
                            }`}
                        >
                            <option value="">Select an industry...</option>
                            <option value="Technology">Technology & SaaS</option>
                            <option value="Agriculture">Farms & Agriculture</option>
                            <option value="Manufacturing">Manufacturing & Industrial</option>
                            <option value="Real Estate">Real Estate Joint Venture</option>
                            <option value="Retail">Retail & E-commerce</option>
                            <option value="Services">Professional Services</option>
                        </select>
                        {errors.industry && <p className="mt-1 text-sm text-red-500">{errors.industry.message}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Asking Price (USD)</label>
                        <input
                            {...register("price", { valueAsNumber: true })}
                            type="number"
                            min="0"
                            disabled={isLoading}
                            className={`w-full px-4 py-2 border bg-white rounded-lg outline-none focus:ring-2 transition-colors ${
                                errors.price ? "border-red-500 focus-ring-red-200" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"    
                            }`}
                            placeholder="e.g 50000"
                        />
                        {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>}
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                        {...register("location")}
                        disabled={isLoading}
                        className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 transition-colors ${
                            errors.location ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                    placeholder="e.g Nairobi, Kenya"
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                    <input
                        {...register("description")}
                        disabled={isLoading}
                        className={`w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 transition-colors ${
                            errors.description ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                    placeholder="Describe the business operations, revenue streams and reason for selling ..."
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center font-medium"
                    >
                        {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Publishing...
                        </>
                        ) : (
                            "Publishing Listing"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};