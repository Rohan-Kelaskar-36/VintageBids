import express from "express";
import { registerUser, loginUser, getAllUsers,getUserById } from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js"; // ✅ Correct import

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, getAllUsers); // ✅ Fixed `protect` instead of `authMiddleware`
router.get("/:userId", protect, getUserById);

export default router;
