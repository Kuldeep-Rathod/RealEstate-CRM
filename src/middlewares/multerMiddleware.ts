import multer, { FileFilterCallback } from "multer";
import { v4 as uuid } from "uuid";
import path from "path";
import { Request } from "express";

// File storage logic
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (file.mimetype === "text/csv") {
            callback(null, "public/uploads/csv"); // CSV files go here
        } else {
            callback(null, "public/users"); // Images go here
        }
    },
    filename: (req, file, callback) => {
        const id = uuid();
        const extName = path.extname(file.originalname);
        const filename = `${id}${extName}`;
        callback(null, filename);
    },
});

// File filter to allow only specific file types
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
) => {
    if (file.mimetype === "text/csv" || file.mimetype.startsWith("image/")) {
        callback(null, true);
    } else {
        callback(new Error("Only images and CSV files are allowed!"));
    }
};

// Multer instance
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Middleware for different types of uploads
export const singlePhotoUpload = upload.single("photo"); // For profile photos
export const singleCSVUpload = upload.single("file"); // For CSV uploads
