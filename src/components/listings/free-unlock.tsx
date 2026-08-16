"use client";

import { useState } from "react";
import { unlockContactFree } from "@/app/api/businesses/[id]/unlock-action";
import { Loader2, Unlock } from "lucide-react";
import { toast } from "sonner";

export default function FreeUnlockButton({ businessId, sellerId }: { businessId: string, sellerId: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUnlock = async () => {
        setIsLoading(true);
        setError(null);

        const result = await unlockContactFree(businessId, sellerId);

        if(result?.error) {
            setError(result.error);
            setIsLoading(false);
        } else {
            toast.success("Contact Details Unlocked!");
        };
    };

    return (
        <div className="mt-6">
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <button
                onClick={handleUnlock}
                disabled={isLoading}
                className="w-full py-3  bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2  disabled:opacity-70"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Unlocking...
                    </>
                ) : (
                    <>
                        <Unlock className="h-5 w-5" />
                        Unlock Contact Details (Free)
                    </>
                )}
            </button>
        </div>
    );
};