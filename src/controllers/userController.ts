import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// Create User
export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, confirmPassword, role } = req.body;
    const photo = req.file;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
    }

    if (password !== confirmPassword) {
        res.status(400);
        throw new Error("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        photo: photo?.path,
    });
    await newUser.save();

    res.status(201).json({
        message: "User created successfully",
        newUser,
    });
});

// Get All Users
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Get User by ID
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json(user);
});

// Update User
export const updateUser = asyncHandler(async (req: Request, res: Response) => {

    if (req.body.password || req.body.confirmPassword) {
        res.status(400);
        throw new Error("For updating password, use updatePassword endpoint");
    }

    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (req.file) {
        req.body.photo = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json({
        message: "User updated successfully",
        updatedUser,
    });
});

// Delete User
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json({ message: "User deleted successfully" });
});
