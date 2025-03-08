import mongoose, { Document, Schema } from "mongoose";

// Lead Interface
interface ILead extends Document {
    name: string;
    email?: string;
    phone: string;
    status: "new" | "contacted" | "interested" | "converted" | "not interested";
    assignedTo: mongoose.Schema.Types.ObjectId;
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
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["new", "contacted", "interested", "converted", "not interested"],
        default: "new",
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
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
