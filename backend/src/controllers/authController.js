import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  const { name, phone, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, phone, email, password: hashedPassword });

  await newUser.save();
  res.json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user });
};
