import express from "express";
import {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead,
} from "../controllers/leadController.js";

const router = express.Router();

router.post("/", createLead); // Create new lead
router.get("/", getLeads); // Get all leads
router.get("/:id", getLeadById); // Get lead by ID
router.put("/:id", updateLead); // Update lead
router.delete("/:id", deleteLead); // Delete lead

export default router;
