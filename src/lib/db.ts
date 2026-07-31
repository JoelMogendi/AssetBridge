import mongoose from "mongoose";
import { cache } from "react";
import { buffer } from "stream/consumers";

// declare global ts variable for the cache
declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
};

// fetch connection
const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI");
};

// Initialize cache object
let cached = global.mongooseCache;

if(!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
};

// Main connection
export async function connectDB () {
    // check connection if it exists
    if(cached.conn) {
        return cached.conn;
    };

    // if it doesn't exists
    if(!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongooseInstance) => {
            console.log("Successfully connected to MongoDB");
            return mongooseInstance;
        });
    };

    // Catch errors
    try {
        
        // Wait for connection to resolve and store it in cache
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};