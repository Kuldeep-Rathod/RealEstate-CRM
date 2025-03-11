import express from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/authController.js";
import { singlePhotoUpload } from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post("/register", singlePhotoUpload, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
