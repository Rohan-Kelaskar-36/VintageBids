import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  title: String,
  description: String,
  startingBid: Number,
  closingTime: Date,
  imageUrl: String,
  status: { type: String, default: "Pending" },
  highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  highestBidderName: { type: String, default: null },}, 
  { strict: false // Pending, Approved
});

const Auction = mongoose.model("Auction", auctionSchema);
export default Auction;
