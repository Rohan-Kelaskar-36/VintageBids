import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "./src/models/admin.js";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(process.env.MongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true });

const hashPassword = async () => {
  const password = "rohan_123"; // Change this to the real password
  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.updateOne(
    { email: "rohan36@gmail.com" }, // Change email to your real admin email
    { $set: { password: hashedPassword } }
  );

  console.log("Admin password updated successfully!");
  mongoose.connection.close();
};

hashPassword();
