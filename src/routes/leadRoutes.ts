import express from "express";
import {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead,
    getUserLeads,
} from "../controllers/leadController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { singleCSVUpload } from "../middlewares/multerMiddleware.js";
import { uploadCSV } from "../controllers/csvController.js";

const router = express.Router();

router.post("/", authenticate, createLead); // Create new lead
router.get("/", authenticate,  getLeads); // Get all leads
router.get("/userLeads", authenticate, getUserLeads); // Get user leads

router.post("/uploadFile", authenticate, singleCSVUpload, uploadCSV);

router.get("/:id", authenticate, getLeadById); // Get lead by ID
router.put("/:id", authenticate, updateLead); // Update lead
router.delete("/:id", authenticate, deleteLead); // Delete lead

export default router;
