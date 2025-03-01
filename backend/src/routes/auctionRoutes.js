import express from "express";
import { getAuctions, postAuction, approveAuction, deleteAuction } from "../controllers/auctionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", getAuctions);
router.post("/", authMiddleware, postAuction);
router.put("/approve/:id", approveAuction);
router.delete("/:id", deleteAuction);

export default router;
