import express from "express";
import {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead,
} from "../controllers/leadController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorizeMiddleware.js";

const router = express.Router();

router.post("/", authenticate, createLead); // Create new lead
router.get("/", authenticate, getLeads); // Get all leads
router.get("/:id", authenticate, getLeadById); // Get lead by ID
router.put("/:id", authenticate, updateLead); // Update lead
router.delete("/:id", authenticate, deleteLead); // Delete lead

export default router;
