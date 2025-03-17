import mongoose, { Document, Schema } from "mongoose";

// Lead Interface
export interface ILead extends Document {
    name: string;
    email?: string;
    phone: string;
    company?: string;
    status: "new" | "hot" | "cold" | "warm";
    assignedTo?: mongoose.Schema.Types.ObjectId;
    notes?: string;
    createdAt: Date;
}

// Lead Schema
const LeadSchema = new Schema<ILead>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        // unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
    },
    company: {
        type: String,
    },
    status: {
        type: String,
        enum: ["new", "hot", "cold", "warm"],
        default: "new",
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    notes: { type: String },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Lead Model
const Lead = mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
