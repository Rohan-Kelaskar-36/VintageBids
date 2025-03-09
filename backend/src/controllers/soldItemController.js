import SoldItem from "../models/soldItems.js";

// Get all sold items
export const getMySoldItems = async (req, res) => {
  try {
    const username = req.user.name; // Extract from authenticated user (ensure JWT contains 'name')
    const soldItems = await SoldItem.find({ winner: username });

    if (!soldItems.length) {
      return res.status(200).json([]); // Empty array instead of error
    }

    res.status(200).json(soldItems);
  } catch (error) {
    console.error("Error fetching sold items:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Get single sold item by ID
export const getSoldItemById = async (req, res) => {
  try {
    const soldItem = await SoldItem.findById(req.params.id);
    if (!soldItem) {
      return res.status(404).json({ message: "Sold item not found" });
    }
    res.status(200).json(soldItem);
  } catch (error) {
    console.error("Error fetching sold item:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getSoldItemsByUser = async (req, res) => {
  try {
    const username = req.params.username;
    const soldItems = await SoldItem.find({ winner: username });

    if (!soldItems.length) {
      return res.status(404).json({ message: "No sold items found for this user." });
    }

    res.status(200).json(soldItems);
  } catch (error) {
    console.error("Error fetching sold items:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new sold item
export const addSoldItem = async (req, res) => {
  try {
    const { itemName, soldPrice, winner } = req.body;

    if (!itemName || !soldPrice || !winner) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSoldItem = new SoldItem({
      itemName,
      soldPrice,
      winner,
    });

    const savedItem = await newSoldItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error adding sold item:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a sold item
export const deleteSoldItem = async (req, res) => {
  try {
    const soldItem = await SoldItem.findById(req.params.id);
    if (!soldItem) {
      return res.status(404).json({ message: "Sold item not found" });
    }

    await soldItem.deleteOne();
    res.status(200).json({ message: "Sold item deleted successfully" });
  } catch (error) {
    console.error("Error deleting sold item:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
