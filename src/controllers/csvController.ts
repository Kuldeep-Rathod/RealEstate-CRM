import { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";
import Lead, { ILead } from "../models/leadModel.js";
import asyncHandler from "express-async-handler";

// Define a custom request interface to extend Express's Request
interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

// Update function to use MulterRequest instead of default Request
export const uploadCSV = asyncHandler(
    async (req: MulterRequest, res: Response) => {
        if (!req.file) {
            throw new Error("No CSV file uploaded"); // Let asyncHandler handle the error
        }

        const results: Partial<ILead>[] = [];

        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                try {
                    await Lead.insertMany(results);

                    // Ensure file exists before deleting
                    if (req.file?.path) {
                        fs.unlinkSync(req.file.path);
                    }

                    res.json({
                        message: "CSV uploaded successfully",
                        data: results,
                    });
                } catch (error) {
                    throw error; // Let asyncHandler handle the error
                }
            });
    }
);
