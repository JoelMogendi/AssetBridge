"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// zod schema
const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phoneNumber: z.string().min(10, "Please enter a valid phone number"),
    role: z.enum(["buyer", "seller"]),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const router = useRouter();
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // Initialize React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phoneNumber: "",
            role: "buyer",
        },
    });

    // Handle form submission
    const onSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true);
        setGlobalError(null);
        setSuccessMsg(null);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setGlobalError(result.error || "Failed to register. Please try again.");
            } else {
                setSuccessMsg("Registration successful! You can now log in.");

                setTimeout(() => {
                    router.push("/login");
                }, 2000)
            }
        } catch (error) {
            setGlobalError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

            {globalError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                    {globalError}
                </div>
            )}

            {successMsg && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-md border border-green-200">
                    {successMsg}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        {...register("name")}
                        disabled={isLoading}
                        type="text"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.name ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                        }`}
                        placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        {...register("email")}
                        disabled={isLoading}
                        type="email"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                        }`}
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        {...register("password")}
                        disabled={isLoading}
                        type="password"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.password ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                        }`}
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        {...register("phoneNumber")}
                        disabled={isLoading}
                        type="tel"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.phoneNumber ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                        }`}
                        placeholder="Enter your phone number"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                </div>

                {/* Role */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                        {...register("role")}
                        disabled={isLoading}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.role ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-50  "
                        }`}
                    >
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 mt-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center font-medium"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin mr-2 h-4 w-4" />
                            Creating Account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </button>
            </form>
        </div>
    );
};