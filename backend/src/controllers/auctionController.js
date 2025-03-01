import Auction from "../models/auction.js";

export const getAuctions = async (req, res) => {
  const auctions = await Auction.find();
  res.json(auctions);
};

export const postAuction = async (req, res) => {
  const { itemName, description, startingBid, closingTime } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const newAuction = new Auction({ itemName, description, startingBid, closingTime, imageUrl });
  await newAuction.save();
  res.json({ message: "Auction posted, pending approval" });
};

export const approveAuction = async (req, res) => {
  const { id } = req.params;
  await Auction.findByIdAndUpdate(id, { status: "Approved" });
  res.json({ message: "Auction approved" });
};

export const deleteAuction = async (req, res) => {
  const { id } = req.params;
  await Auction.findByIdAndDelete(id);
  res.json({ message: "Auction deleted" });
};
