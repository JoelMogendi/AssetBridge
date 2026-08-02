import LoginForm from "@/components/forms/login-form";
import { title } from "process";

export const metadata = {
    title: "Login | Investor Marketplace",
    description: "Sign in to access high-value business investments and joint ventures.",
};

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <LoginForm />
        </div>
    );
};