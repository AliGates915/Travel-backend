import Package from "../models/Package.js";
import mongoose from "mongoose";

// Create Package
export const createPackage = async (req, res, next) => {
  console.log('Incoming request body:', req.body); // Log to check incoming data

  try {
    const newPackage = new Package({
      packageName: String(req.body.packageName),
    });
    
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    next(error);
  }
};

// Update Package
export const updatePackage = async (req, res, next) => {
  try {
    const packageId = req.params.id;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Update destination using correct field names
    const updatedPackage = await Package.findByIdAndUpdate(
        packageId,
      {
        packageName: req.body.packageName, // Ensure the property matches the 
      },
      { new: true } // Return the updated document
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json(updatedPackage);
  } catch (error) {
    next(error);
  }
};

// Delete Package
export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Package ID is required" });
    }

    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific Package by ID
export const getPackage = async (req, res, next) => {
  try {
    const packageId = req.params.id;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const packageType = await Package.findById(packageId);
    if (!packageType) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json(packageType);
  } catch (error) {
    next(error);
  }
};

// Get all Facilities
export const getAllPackage = async (req, res, next) => {
  try {
    const packagesTypes = await Package.find();

    if (packagesTypes.length === 0) {
      return res.status(200).json({ message: "No packages types found" });
    }
    res.status(200).json(packagesTypes);
  } catch (error) {
    next(error);
  }
};

