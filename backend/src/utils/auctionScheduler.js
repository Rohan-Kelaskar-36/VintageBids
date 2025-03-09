import Auction from "../models/auction.js";
import { finalizeAuction } from "../controllers/auctionController.js";

const scheduleAuctionFinalization = async () => {
    try {
      const now = new Date();
      const auctionsToFinalize = await Auction.find({ closingTime: { $lte: now }, status: "Approved" });
  
      for (const auction of auctionsToFinalize) {
        const result = await finalizeAuction(auction._id);
        if (result.error) {
          console.error(`Failed to finalize auction ${auction._id}: ${result.error}`);
        } else {
          console.log(`Auction ${auction._id} finalized successfully.`);
        }
      }
    } catch (error) {
      console.error("Error scheduling auction finalization:", error.message);
    }
  };
  export default scheduleAuctionFinalization;