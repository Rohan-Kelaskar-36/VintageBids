import mongoose from "mongoose";

const soldItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  soldPrice: { type: Number, required: true },
  winner: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description:{ type: String, required: true },
});

const SoldItem = mongoose.model("SoldItem", soldItemSchema);
export default SoldItem;
