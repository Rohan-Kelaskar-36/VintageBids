import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import auctionRoutes from "./src/routes/auctionRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auctions", auctionRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
