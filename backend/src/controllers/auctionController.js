import Auction from "../models/auction.js";
import User from "../models/user.js";
import SoldItem from "../models/soldItems.js";
import mongoose from "mongoose";
import  scheduleAuctionFinalization  from "../utils/auctionScheduler.js";

export const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get approved auctions (for user live auctions)
export const getApprovedAuctions = async (req, res) => {
  try {
    const approvedAuctions = await Auction.find({ status: "Approved" }).select("itemName startingBid imageUrl");
    res.json(approvedAuctions);
  } catch (error) {
    console.error("Error fetching approved auctions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Post a new auction (by user)
export const postAuction = async (req, res) => {
  try {
    console.log("Received auction data:", req.body);

    const { title, description, startingBid, closingTime } = req.body;

    if (!title || !description || !startingBid || !closingTime) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newAuction = new Auction({
      title,  
      description,
      startingBid: Number(startingBid),
      closingTime,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
      status: "Pending",
    });

    const savedAuction = await newAuction.save();
    res.status(201).json(savedAuction);
  } catch (error) {
    console.error("Error posting auction:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Approve an auction (Admin action)
export const approveAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const auction = await Auction.findByIdAndUpdate(id, { status: "Approved" }, { new: true });

    if (!auction) return res.status(404).json({ message: "Auction not found" });

    res.json({ message: "Auction approved", auction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an auction (Admin action)
export const deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;
    await Auction.findByIdAndDelete(id);
    res.json({ message: "Auction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Place a bid (deduct coins temporarily from user's dummyCoins)
export const placeBid = async (req, res) => {
  try {
    const { bidAmount, userId } = req.body;
    const { id } = req.params;

    if (!bidAmount || !userId) {
      return res.status(400).json({ message: "Bid amount and user ID are required." });
    }

    // Find the auction
    const auction = await Auction.findById(id);
    if (!auction) return res.status(404).json({ message: "Auction not found." });

    // Prevent bidding after closing time
    const now = new Date();
    if (new Date(auction.closingTime) <= now) {
      return res.status(400).json({ message: "Bidding is closed for this auction." });
    }

    // Validate bid amount
    if (bidAmount <= auction.startingBid) {
      return res.status(400).json({ message: "Bid must be higher than the current bid." });
    }

    // Find the user placing the bid
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Check user balance
    if (user.dummyCoins < bidAmount) {
      return res.status(400).json({ message: "Insufficient balance." });
    }

    // Refund previous highest bidder if exists
    if (auction.highestBidder) {
      const previousBidder = await User.findById(auction.highestBidder);
      if (previousBidder) {
        previousBidder.dummyCoins += auction.startingBid;
        await previousBidder.save();
      }
    }

    // Deduct dummy coins from the new bidder
    user.dummyCoins -= bidAmount;
    await user.save();

    // Update auction details
    auction.startingBid = bidAmount;
    auction.highestBidder = user._id;
    auction.highestBidderName = user.name;
    await auction.save();

    res.json({
      message: "Bid placed successfully",
      auction,
      remainingCoins: user.dummyCoins,
    });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Finalize an auction (refund 50% of bid to winner and mark auction as finalized)
export const finalizeAuction = async (auctionId) => {
  try {
    const auction = await Auction.findById(auctionId);

    if (!auction) throw new Error("Auction not found");
    if (auction.status !== "Approved") throw new Error("Auction not approved or already finalized");
    if (!auction.highestBidder) throw new Error("No bids placed");

    const winner = await User.findById(auction.highestBidder);
    if (!winner) throw new Error("Winning user not found");

    // Refund 50% of the winning bid
    const refundAmount = auction.startingBid * 0.5;
    winner.dummyCoins += refundAmount;
    await winner.save();

    // Store item in SoldItem collection
    const soldItem = new SoldItem({
      itemName: auction.title,
      soldPrice: auction.startingBid,
      winner: winner.name,
      imageUrl: auction.imageUrl,
      description: auction.description,
    });
    await soldItem.save();

    // Delete the auction after finalizing
    await Auction.findByIdAndDelete(auctionId);

    console.log(`Auction ${auctionId} finalized successfully`);
    return { message: "Auction finalized", soldItem, winner };
  } catch (error) {
    console.error(`Error finalizing auction ${auctionId}:`, error.message);
    return { error: error.message }; // Return error instead of using res.status
  }
};
