import express from "express";
import {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", createEmployee); // Create new employee
router.get("/", getEmployees); // Get all employees
router.get("/:id", getEmployeeById); // Get employee by ID
router.put("/:id", updateEmployee); // Update employee
router.delete("/:id", deleteEmployee); // Delete employee

export default router;
