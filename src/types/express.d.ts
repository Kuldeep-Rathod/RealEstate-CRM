import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    file?: Express.Multer.File;  // ✅ Use Express.Multer.File
    files?: Express.Multer.File[]; 
  }
}
