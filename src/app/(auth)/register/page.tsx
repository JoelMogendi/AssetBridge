import RegisterForm from "@/components/forms/register-form";
import Link from "next/link";

export const metadata = {
  title: "Register - AssetBridge",
  description: "Create an account to start using AssetBridge.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 ">
        <RegisterForm />

        {/* nav back to login */}
        <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:underline">
                Sign in
            </Link>
        </p>
    </div>
  );
};