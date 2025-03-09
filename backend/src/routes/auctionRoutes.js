import express from "express";
import multer from "multer";
import fs from "fs";
import {
  getAuctions,
  postAuction,
  approveAuction,
  deleteAuction,
  getApprovedAuctions
} from "../controllers/auctionController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { placeBid } from "../controllers/auctionController.js";

const router = express.Router();

// Ensure 'uploads' directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// Auction Routes
router.post("/", protect, upload.single("imageUrl"), postAuction);
router.get("/", getAuctions);
router.put("/approve/:id", protect, admin, approveAuction);
router.get("/approved", getApprovedAuctions);
router.delete("/:id", protect, admin, deleteAuction);
router.put("/:id/bid", protect, placeBid);  


export default router;
