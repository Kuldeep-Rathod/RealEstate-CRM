import express from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorizeMiddleware.js";
import { singleUpload } from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post("/", authenticate, singleUpload, authorize(["admin"]), createUser); // Create new User
router.get("/", authenticate, authorize(["admin"]), getUsers); // Get all Users
router.get("/:id", authenticate, authorize(["admin"]), getUserById); // Get User by ID
router.put("/:id", authenticate, singleUpload, authorize(["admin"]), updateUser); // Update User
router.delete("/:id", authenticate, authorize(["admin"]), deleteUser); // Delete User

export default router;
