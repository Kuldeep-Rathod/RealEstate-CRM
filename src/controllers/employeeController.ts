import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModel.js";
import bcrypt from "bcryptjs";

// Create Employee
export const createEmployee = asyncHandler(
    async (req: Request, res: Response) => {
        const { name, email, password, role } = req.body;

        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            res.status(400);
            throw new Error("Employee already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newEmployee = new Employee({ name, email, password: hashedPassword, role });
        await newEmployee.save();

        res.status(201).json({
            message: "Employee created successfully",
            newEmployee,
        });
    }
);

// Get All Employees
export const getEmployees = asyncHandler(
    async (req: Request, res: Response) => {
        const employees = await Employee.find();
        res.status(200).json(employees);
    }
);

// Get Employee by ID
export const getEmployeeById = asyncHandler(
    async (req: Request, res: Response) => {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            res.status(404);
            throw new Error("Employee not found");
        }
        res.status(200).json(employee);
    }
);

// Update Employee
export const updateEmployee = asyncHandler(
    async (req: Request, res: Response) => {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedEmployee) {
            res.status(404);
            throw new Error("Employee not found");
        }
        res.status(200).json({
            message: "Employee updated successfully",
            updatedEmployee,
        });
    }
);

// Delete Employee
export const deleteEmployee = asyncHandler(
    async (req: Request, res: Response) => {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            res.status(404);
            throw new Error("Employee not found");
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    }
);
