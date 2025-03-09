import express from "express";
import { getMySoldItems, getSoldItemById, addSoldItem, deleteSoldItem,getSoldItemsByUser } from "../controllers/soldItemController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/my-items", protect, getMySoldItems); // Uses authMiddleware to get user info
router.get("/:id", protect, getSoldItemById);
router.post("/", protect, admin, addSoldItem);
router.delete("/:id", protect, admin, deleteSoldItem);
router.get("/user/:username", protect, getSoldItemsByUser);

export default router;
