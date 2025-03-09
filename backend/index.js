import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import auctionRoutes from "./src/routes/auctionRoutes.js";
import soldItemRoutes from "./src/routes/soldItemRoutes.js";
import multer from "multer";
import path from "path";
import scheduleAuctionFinalization from "./src/utils/auctionScheduler.js";

dotenv.config();
connectDB();
scheduleAuctionFinalization();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded images as static files
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/sold-items", soldItemRoutes);
app.use(multer().single("image"));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
