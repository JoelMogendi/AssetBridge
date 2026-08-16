"use server";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";
import { revalidatePath } from "next/cache";
import { success } from "zod";

export async function unlockContactFree(businessId:  string, sellerId: string) {
    const session = await auth();

    if(!session?.user || session.user.role !== "buyer") {
        return { error: "Only registered buyers can unlock contact details." };
    }; 

    await connectDB();

    try {
        
        // avoid dupliiciations of unlocking
        const existing = await Transaction.findOne({
            buyerId: session.user.id,
            businessId: businessId,
            status: "completed"
        });

        if(existing)  return { success: true };

        // free completed transaction
        await Transaction.create({
            buyerId: session.user.id,
            businessId: businessId,
            sellerId: sellerId,
            amount: 0,
            paymentMethod: "free_promo",
            status: "completed",
        });

        // refresh page instantly 
        revalidatePath(`/businesses/${businessId}`);
        return { success: true };

    } catch (error) {
        console.error("Unlock Error:", error);
        return { error: "Failed to unlock contact. Please try again."};
    }
};