import mongoose, { Document, Schema } from "mongoose";

// User Interface
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "agent";
    photo?: string;
    otp?: string;
    otpExpiry?: Date;
    isVerified?: boolean;
    createdAt: Date;
}

// User Schema
const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "agent"],
        default: "agent",
    },
    photo: {
        type: String,
        default: "",
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// User Model
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
