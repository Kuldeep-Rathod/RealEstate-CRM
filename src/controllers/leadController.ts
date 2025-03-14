import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Lead from "../models/leadModel.js";
import { AuthRequest } from "../middlewares/authorizeMiddleware.js";
import mongoose from "mongoose";

// Create Lead
export const createLead = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone, company, status, assignedTo, notes } = req.body;

    const newLead = new Lead({
        name,
        email,
        phone,
        company,
        status,
        assignedTo,
        notes,
    });
    await newLead.save();

    res.status(201).json({ message: "Lead created successfully", newLead });
});

// Get All Leads
export const getLeads = asyncHandler(async (req: Request, res: Response) => {
    const leads = await Lead.find().populate("assignedTo", "name email");
    res.status(200).json(leads);
});

// Get User Leads
export const getUserLeads = asyncHandler(
    async (req: AuthRequest, res: Response) => {
        const userId = req.user?._id;

        if (!userId) {
            res.status(401);
            throw new Error("User not authenticated");
        }

        const leads = await Lead.find({
            assignedTo: new mongoose.Types.ObjectId(userId),
        }).populate("assignedTo", "name email");

        res.status(200).json(leads);
    }
);

// Get Lead by ID
export const getLeadById = asyncHandler(async (req: Request, res: Response) => {
    const lead = await Lead.findById(req.params.id).populate(
        "assignedTo",
        "name email"
    );
    if (!lead) {
        res.status(404);
        throw new Error("Lead not found");
    }
    res.status(200).json(lead);
});

// Update Lead
export const updateLead = asyncHandler(async (req: Request, res: Response) => {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    }).populate("assignedTo", "name email");
    if (!updatedLead) {
        res.status(404);
        throw new Error("Lead not found");
    }
    res.status(200).json({ message: "Lead updated successfully", updatedLead });
});

// Delete Lead
export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) {
        res.status(404);
        throw new Error("Lead not found");
    }
    res.status(200).json({ message: "Lead deleted successfully" });
});
