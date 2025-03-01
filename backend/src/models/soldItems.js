import mongoose from "mongoose";

const soldItemSchema = new mongoose.Schema({
  itemName: String,
  soldPrice: Number,
  winner: String, // Username of the highest bidder
});

const SoldItem = mongoose.model("SoldItem", soldItemSchema);
export default SoldItem;
