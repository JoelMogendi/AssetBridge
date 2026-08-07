import { NextResponse  } from "next/server";
import { connectDB } from "@/lib/db";
import Business from "@/models/Business";
import { auth } from "@/auth";


// Fetch all available businesses with optional filters
export async function GET(req: Request) {
    try {
        
        // mongodb connection
        await connectDB();

        //extract query parameters from url
        const { searchParams } = new URL(req.url);
        const industry = searchParams.get("industry"); 
        const location = searchParams.get("location"); 
        const minPrice = searchParams.get("minPrice"); 
        const maxPrice = searchParams.get("maxPrice");
        
        // dynamic filter objects
        const filter: Record<string, any> = { status: "available" };

        if(industry) filter.industry = { $regex: industry, $options: "i" };
        if(location) filter.location = { $regex: location, $options: "i" };
        if(minPrice || maxPrice) {
            filter.price = {};
            if(minPrice) filter.price.$gte = Number(minPrice);
            if(maxPrice) filter.price.$lte = Number(maxPrice);
        };

        // Fetch listings sorted by newest first
        const businesses = await Business.find(filter)
            .sort({ createdAt: -1 })
            .select("-__v");

            return NextResponse.json({ businesses }, { status: 200 });



    } catch (error) {
        console.error("Get Business Error:", error);
        return NextResponse.json({ error: "Failed to fetch businesses "}, { status: 500 });
    }
};


// create new business listing
export async function POST(req: Request) {
    try {
        
        // verify user session
        const session = await auth();

        if(!session?.user) {
            return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
        };

        const body = await req.json();
        const { title, description, price, location, industry } = body;

        // validation
        if(!title || !description || !price || !location || !industry ) {
            return NextResponse.json({ error: "All fields are required"}, { status: 400 });
        };

        // mongodb connection
        await connectDB();

        // create new business bound to seller
        const newBusiness = await Business.create({
            sellerId: session.user.id,
            title,
            description,
            price: Number(price),
            location,
            industry,
            status: "available",
        });

        return NextResponse.json(
            { message: "Business listed successfully", business: newBusiness },
            { status: 201 }
        );


    } catch (error) {
        console.error("POST Business Error:", error);
        return NextResponse.json({ error: "Failed to create business listing" }, { status: 500 });
    }
};