import NextAuth from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// create a handler for next auth
const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        credentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "password", type: "password" }
            }, 
            async authorize(credentials) {
                // check If user typed anything
                if(!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter an email and password.");
                };

                // mongoDB connection
                await connectDB();

                // Find user by email
                const user = await User.findOne({ email: credentials.email });

                // check if user exists
                if(!user || !user?.passwordHash) {
                    throw new Error("No user found with this email.");
                }; 

                // check if password is correct
                const isPasswordValid = await bcrypt.compare(credentials.password as string, user.passwordHash);

                if(!isPasswordValid) {
                    throw new Error("Invalid password. Please try again.");
                };

                // If successful, return user object to NextAuth
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
            }
        })
    ],

    // callbacks for session and jwt
    callbacks: {

        // Attach user ID and role to the session object
        async jwt({ token, user }) {
            if(user) {
                token.id = user.id;
                token.role = (user as any).role; // Type assertion to access role
            }
            return token;
        },
        async session({ session, token }) {
            if(token) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login" //custom login page
    },
    session: {
        strategy: "jwt", //for security
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handlers, signIn, signOut, auth };