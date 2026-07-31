import mongoose, { Schema, Document } from "mongoose";

// ts interface
export interface IUser extends Document {
    name: String;
    email: String;
    passwordHash: String;
    role: "buyer" | "seller" | "admin";
    phoneNumber: String;
    isVerified: Boolean;
    createdAt: Date;
};

// Schema
const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        passwordHash: {
            type:String,
            required: true,
            min: 6,
        },
        role: {
            type: String,
            enum: ["buyer", "seller", "admin"],
            default: "buyer"
        },
        phoneNumber: {
            type: String,
            unique: true,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
    },

    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;