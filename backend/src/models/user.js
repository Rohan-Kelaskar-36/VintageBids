import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);
export default User;
