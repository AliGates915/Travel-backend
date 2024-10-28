// controllers/PackageListController.js
import PackageList from "../models/PackageList.js";
import mongoose from "mongoose";

// Create PackageList
export const createPackageList = async (req, res, next) => {
  console.log('Incoming request body:', req.body); // Log to check incoming data

  try {
    const newPackageList = new PackageList({
      packageName: req.body.packageName, // String value
      totalDays: req.body.totalDays,
      days: req.body.days,
      nights: req.body.nights,
      tourType: req.body.tourType, // String value
      facilities: req.body.facilities, // Array of strings
      rate: req.body.rate,
      logoPicture: req.body.logoPicture, // Ensure this is included
      description: req.body.description,
    });
  
    const savedPackageList = await newPackageList.save();
    res.status(201).json(savedPackageList);
  } catch (error) {
    next(error);
  }
};

// Update PackageList
export const updatePackageList = async (req, res, next) => {
  try {
    const packageListId = req.params.id;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(packageListId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Update package list using correct field names
    const updatedPackageList = await PackageList.findByIdAndUpdate(
      packageListId,
      {
        packageName: req.body.packageName,
        totalDays: req.body.totalDays,
        days: req.body.days,
        nights: req.body.nights,
        tourType: req.body.tourType,
        facilities: req.body.facilities,
        rate: req.body.rate,
        logoPicture: req.body.logoPicture,
        description: req.body.description,
      },
      { new: true } // Return the updated document
    );

    if (!updatedPackageList) {
      return res.status(404).json({ message: "Package list not found" });
    }
    res.status(200).json(updatedPackageList);
  } catch (error) {
    next(error);
  }
};

// Delete PackageList
export const deletePackageList = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "PackageList ID is required" });
    }

    const deletedPackageList = await PackageList.findByIdAndDelete(id);
    if (!deletedPackageList) {
      return res.status(404).json({ message: "Package list not found" });
    }

    res.status(200).json({ message: "Package list deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific PackageList by ID
export const getPackageList = async (req, res, next) => {
  try {
    const packageListId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(packageListId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const packageList = await PackageList.findById(packageListId);
    if (!packageList) {
      return res.status(404).json({ message: "Package list not found" });
    }

    res.status(200).json(packageList);
  } catch (error) {
    next(error);
  }
};

// Get all PackageLists
export const getAllPackageList = async (req, res, next) => {
  try {
    const packageLists = await PackageList.find();

    if (packageLists.length === 0) {
      return res.status(200).json({ message: "No package lists found" });
    }
    res.status(200).json(packageLists);
  } catch (error) {
    next(error);
  }
};
