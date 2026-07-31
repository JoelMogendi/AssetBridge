import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { z } from "zod";

// Validate input
const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: z.string().min(10, "Please enter a valid phone number"),
    role: z.enum(["buyer", "seller"]).default("buyer"),
});

export async function POST(req: Request) {
    try {
        const body= await req.json();

        // Validate payload
        const validation = registerSchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json(
                { error: z.treeifyError(validation.error) },
                { status: 400 }
            );
        };

        const { name, email, password, phoneNumber, role } = validation.data;

        // mongodb connection
        await connectDB();

        // check if user exists
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return NextResponse.json(
                {error: "An account with this email already exists."},
                { status: 409 }
            );
        };

        // hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // create new user
        const newUser = await User.create({
            name,
            email,
            passwordHash,
            phoneNumber,
            role,
        });

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: {
                    id: newUser._id.toString(),
                    name: newUser.name,
                    email: newUser.email,
                    phoneNumber: newUser.phoneNumber,
                    role: newUser.role,
                },
            },
            { status: 201 }
        );

    } catch(error){
        console.error("Registration Error:", error);
        return NextResponse.json(
            { error: "Internal server error "},
            { status: 500 }
        );
    };
};