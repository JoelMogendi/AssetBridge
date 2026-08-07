
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Business from "@/models/Business";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import { auth } from "@/auth";

// Fetch business with filters 
export async function GET(
    req: Request,
    { params }: {params: { id: string }}
) {
    try {
        const businessId = params.id
        
        await connectDB();

        // find business and populate basic info
        const business = await Business.findById(businessId).populate(
            "sellerId",
            "name"
        );

        if(!business) {
            return NextResponse.json({ error: "Business listing not found" }, { status: 404 });
        };

        // check active session
        const session = await auth();
        let isUnlocked = false;
        let sellerContact = null;

        if(session?.user) {
            // check if user is the actual seller
            const isOwner = business.sellerId._id.toString() === session.user.id;

            if(isOwner) {
                isUnlocked = true;
            } else{
                // Check if  buyer has completed a transaction
                const completedTx = await Transaction.findOne({
                    buyerId: session.user.id,
                    businessId: business._id,
                    status: "completed",
                });

                if(completedTx) {
                    isUnlocked = true;
                };
            };

            // if unlocked fetch seller details
            if(isUnlocked) {
                const sellerDetails = await User.findById(business.sellerId._id).select(
                    "email phoneNumber"
                );
                sellerContact = {
                    email: sellerDetails?.email,
                    phoneNumber: sellerDetails?.phoneNumber,
                };
            };
        };

        return NextResponse.json({
            business,
            isUnlocked,
            sellerContact,
        }, { status: 200 });



    } catch (error) {
        console.error("GET Single Business Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status : 500 });
    }
};

// update existing business listing
export async function PATCH(
    req: Request,
    { params }: { params: { id: string }}
){
    try {
        const session = await auth();

        if(!session?.user) {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401 });
            
        };

        await connectDB();
        const businessId = params.id;

        // find business ownership
        const business = await Business.findById(businessId);
        if(!business) {
            return NextResponse.json({ error: "Business not found"}, { status: 404 });
        };

        //ensure its the owner
        if(business.sellerId.toString() !== session.user.id) {
            return NextResponse.json({ error: "Forbidden. You can only edit your own listing" });
        }; 

        const body = await req.json();
        const { title, description, price, location, industry, status } = body;

        // update document
        const updateBusiness = await Business.findByIdAndUpdate(
            businessId,
            {
                $set: {
                    ...(title && { title }),
                    ...(description && { description }),
                    ...(price && { price }),
                    ...(location && { location }),
                    ...(industry && { industry }),
                    ...(status && { status })

                },
            },
                { new: true, runValidators: true }
        );

        return NextResponse.json(
            { message: "Business updated", business: updateBusiness },
            { status: 200 }
        );


    } catch (error) {
        console.error("PATCH Business Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

// Delete document

export async function DELETE(
    req: Request,
    { params }: { params: { id: string }}
){
    try {
        const session = await auth();

        if(!session?.user) {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401 });
            
        };

        await connectDB();
        const businessId = params.id;

        // find business ownership
        const business = await Business.findById(businessId);
        if(!business) {
            return NextResponse.json({ error: "Business not found"}, { status: 404 });
        };

        //ensure its the owner
        if(business.sellerId.toString() !== session.user.id) {
            return NextResponse.json({ error: "Forbidden. You can only delete your own listing" });
        };
        
        await Business.findByIdAndDelete(businessId);

        return NextResponse.json(
            { message: "Business deleted successfully"},
            { status: 403 }
        );


    } catch (error) {
        console.error("DELETE Business Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    };
};