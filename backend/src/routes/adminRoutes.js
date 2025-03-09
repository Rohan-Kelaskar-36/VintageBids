import express from "express";
import { adminLogin, approveAuction, getAllUsers } from "../controllers/adminController.js";
import { protect, admin } from "../middlewares/authMiddleware.js"; 
const router = express.Router();

router.post("/login", adminLogin);
router.put("/approve-auction/:id", protect, approveAuction);
router.get("/users", protect, getAllUsers);

export default router;
