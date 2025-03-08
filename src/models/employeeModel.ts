import mongoose, { Document, Schema } from "mongoose";

// Employee Interface
export interface IEmployee extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "agent" | "manager";
    createdAt: Date;
}

// Employee Schema
const EmployeeSchema = new Schema<IEmployee>({
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
        enum: ["admin", "agent", "manager"],
        default: "agent",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Employee Model
const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);

export default Employee;
