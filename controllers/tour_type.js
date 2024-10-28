import TourType from "../models/TourType.js";
import mongoose from "mongoose";

// Create TourType
export const createTourType = async (req, res, next) => {
  const newTourType = new TourType(req.body);
  try {
    const savedTourType = await newTourType.save();
    res.status(201).json(savedTourType);
  } catch (error) {
    next(error);
  }
};

// Update TourType
export const updateTourType = async (req, res, next) => {
  try {
    const updatedTourType = await TourType.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedTourType) {
      return res.status(404).json({ message: "Tour Type not found" });
    }
    res.status(200).json(updatedTourType);
  } catch (error) {
    next(error);
  }
};

// Delete TourType
export const deleteTourType = async (req, res, next) => {
  try {
    const deletedTourType = await TourType.findByIdAndDelete(req.params.id);
    if (!deletedTourType) {
      return res.status(404).json({ message: "Tour Type not found" });
    }
    res.status(200).json({ message: "Successfully deleted Tour Type", deletedTourType });
  } catch (error) {
    next(error);
  }
};

// Get a specific TourType by ID
export const getTourType = async (req, res, next) => {
  try {
    const tourId = req.params.id;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const tourType = await TourType.findById(tourId);
    if (!tourType) {
      return res.status(404).json({ message: "Tour Type not found" });
    }

    res.status(200).json(tourType);
  } catch (error) {
    next(error);
  }
};

// Get all TourTypes
export const getAllTourType = async (req, res, next) => {
  try {
    const tourTypes = await TourType.find();

    if (tourTypes.length === 0) {
      return res.status(200).json({ message: "No Tour Types found" });
    }
    res.status(200).json(tourTypes);
  } catch (error) {
    next(error);
  }
};
