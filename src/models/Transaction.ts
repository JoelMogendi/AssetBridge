import mongoose, { Schema, Document } from "mongoose";

// TypeScript Interface
export interface ITransaction extends Document {
    buyerId: mongoose.Types.ObjectId;
    businessId: mongoose.Types.ObjectId;
    sellerId: mongoose.Types.ObjectId;
    amount: Number;
    status: "pending" | "completed" | "failed" | "refunded";
    paymentMethod?: String;
    createdAt: Date;
    updatedAt: Date;
};

// Mongoose Schema
const TransactionSchema = new Schema<ITransaction>(
    {
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        businessId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true
        },
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed", "refunded"],
            default: "pending"
        },
        paymentMethod: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;