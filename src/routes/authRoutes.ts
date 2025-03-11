import express from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/authController.js";
import { singleUpload } from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post("/register", singleUpload, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
