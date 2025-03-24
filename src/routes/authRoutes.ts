import express from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    verifyOTP,
} from "../controllers/authController.js";
import { singlePhotoUpload } from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post("/register", singlePhotoUpload, registerUser);
router.post("/verify-otp", verifyOTP);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
