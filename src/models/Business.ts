import mongoose, { Schema, Document, Types } from "mongoose";

// ts interface
export interface IBusiness extends Document {
    sellerId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    industry: string,
    location: string,
    price: Number;
    status:"available" | "pending" | "sold";
    createdAt: Date;
    updatedAt: Date;
};

const BusinessSchema = new Schema<IBusiness>(
    {
        sellerId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
          description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
         status: {
            type: String,
            enum: ["available", "pending", "sold"],
            default: "available"
        },
        location: {
            type: String,
            required: true
        },
        industry: {
            type: String,
            required: true
        }
    },

    { timestamps: true }
);

const Business = mongoose.models.Business || mongoose.model<IBusiness>("Business", BusinessSchema);

export default Business;