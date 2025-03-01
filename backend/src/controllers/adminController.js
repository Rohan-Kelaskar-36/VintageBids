import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import Auction from "../models/auction.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ message: "Admin not found" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, admin });
};

export const approveAuction = async (req, res) => {
  const { id } = req.params;

  const auction = await Auction.findById(id);
  if (!auction) return res.status(404).json({ message: "Auction not found" });

  auction.status = "Approved";
  await auction.save();

  res.json({ message: "Auction approved successfully" });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
