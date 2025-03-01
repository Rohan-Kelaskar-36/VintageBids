import express from "express";
import { adminLogin, approveAuction, getAllUsers } from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.put("/approve-auction/:id", authMiddleware, approveAuction);
router.get("/users", authMiddleware, getAllUsers);

export default router;
