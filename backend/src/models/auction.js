import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  startingBid: Number,
  closingTime: Date,
  imageUrl: String,
  status: { type: String, default: "Pending" }, // Pending, Approved
});

const Auction = mongoose.model("Auction", auctionSchema);
export default Auction;
