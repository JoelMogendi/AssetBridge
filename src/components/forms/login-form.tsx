"use client";

import { useState  } from "react";
import{ useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter  } from "next/navigation";
import { Loader2 } from "lucide-react";

// Define zod schema
const loginSchema = z.object({
    email: z.email("Please enter a valid email address."),
    password: z.string().min(1, "Password is required"),
});

// Infer ts type from the zod schema
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Initialize React Hook Form with zod validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Handle form submisison
    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        setGlobalError(null);

        try {
            
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect :false,
            }); 

            if(result?.error) {
                setGlobalError(result.error);
            } else if(result?.ok) {
                // successfull, redirect user to dashboard
                router.push("/");
                router.refresh();
            }
        } catch (error) {
            setGlobalError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Sign In to Investor Platform
            </h2>

            {/* Display global errors */}
            {globalError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                    {globalError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                    {...register("email")}
                    type="email"
                    disabled={isLoading}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-colors ${
                        errors.email
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                    placeholder="youremail@example.com" 
                    />

                    {errors.email &&(
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                {/* password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                    {...register("password")}
                    type="password"
                    disabled={isLoading}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-colors ${
                        errors.password
                            ? "border-red-500 focus:ring-red-200"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                    placeholder="......." 
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                {/* submit button */}
                <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center font-medium"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing In...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </button>
            </form>
        </div>
    );
};