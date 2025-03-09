import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dummyCoins: { type: Number, default: 2000 }  // User gets 2000 coins on registration
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
