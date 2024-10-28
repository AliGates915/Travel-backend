import Destination from "../models/Destination.js";
import mongoose from "mongoose";

// Create Destination
export const createDestination = async (req, res, next) => {
  console.log('Incoming request body:', req.body); // Log to check incoming data

  try {
    const newDestination = new Destination({
      countryName: String(req.body.countryName),
      cityName: String(req.body.cityName),
      destinationName: String(req.body.destinationName),  
    });
    
    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);
  } catch (error) {
    console.error('Error saving destination:', error); // Log any errors
    next(error);
  }
};

// Update Destination
export const updateDestination = async (req, res, next) => {
  try {
    const destinationId = req.params.id;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(destinationId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Update destination using correct field names
    const updatedDestination = await Destination.findByIdAndUpdate(
      destinationId,
      {
        countryName: req.body.countryName, // Ensure the property matches the incoming request
        cityName: req.body.cityName,       // Ensure the property matches the incoming request
        destinationName: req.body.destinationName,
      },
      { new: true } // Return the updated document
    );

    if (!updatedDestination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json(updatedDestination);
  } catch (error) {
    console.error('Error updating destination:', error); // Log any errors
    next(error);
  }
};

// Delete Destination
export const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Destination ID is required" });
    }

    const deletedDestination = await Destination.findByIdAndDelete(id);
    if (!deletedDestination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    console.error('Error deleting destination:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific Destination by ID
export const getDestination = async (req, res, next) => {
  try {
    const destinationId = req.params.id;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(destinationId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const destinationType = await Destination.findById(destinationId);
    if (!destinationType) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json(destinationType);
  } catch (error) {
    console.error('Error fetching destination:', error);
    next(error);
  }
};

// Get all Facilities
// Get all Facilities
export const getAllDestination = async (req, res, next) => {
  try {
    const destinationTypes = await Destination.find();

    if (destinationTypes.length === 0) {
      return res.status(200).json({ message: "No destination types found" });
    }

    // Map to get only cityName and destinationName fields for each destination
    const citiesAndDestinations = destinationTypes.map(dest => ({
      countryName: dest.countryName,
      cityName: dest.cityName,
      destinationName: dest.destinationName
    }));

    // Send all cityName and destinationName
    res.status(200).json(citiesAndDestinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    next(error);
  }
};



