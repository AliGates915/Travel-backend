import Facility from "../models/Facility.js";
import mongoose from "mongoose";

// Create Facility
export const createFacility = async (req, res, next) => {
  console.log('Incoming request body:', req.body); // Log to check incoming data

  try {
    const newFacility = new Facility({
      facilityName: Array.isArray(req.body.facilityName) ? req.body.facilityName[0] : req.body.facilityName,
      tourName: Array.isArray(req.body.tourName) ? req.body.tourName[0] : req.body.tourName,  // Ensure tourName is handled correctly
    });
    
    const savedFacility = await newFacility.save();
    console.log('Saved facility:', savedFacility); // Log saved facility
    res.status(201).json(savedFacility);
  } catch (error) {
    console.error('Error saving facility:', error); // Log any errors
    next(error);
  }
};

// Update Facility
export const updateFacility = async (req, res, next) => {
  try {
    const updatedFacility = await Facility.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedFacility) {
      return res.status(404).json({ message: "Facility not found" });
    }
    res.status(200).json(updatedFacility);
  } catch (error) {
    console.error('Error updating facility:', error); // Log any errors
    next(error);
  }
};

// Delete Facility
export const deleteFacility = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Facility ID is required" });
    }

    const deletedFacility = await Facility.findByIdAndDelete(id);
    if (!deletedFacility) {
      return res.status(404).json({ message: "Facility not found" });
    }

    res.status(200).json({ message: "Facility deleted successfully" });
  } catch (error) {
    console.error('Error deleting facility:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific Facility by ID
export const getFacility = async (req, res, next) => {
  try {
    const facilityId = req.params.id;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(facilityId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const facilityType = await Facility.findById(facilityId);
    if (!facilityType) {
      return res.status(404).json({ message: "Facility not found" });
    }

    res.status(200).json(facilityType);
  } catch (error) {
    console.error('Error fetching facility:', error);
    next(error);
  }
};

// Get all Facilities
export const getAllFacility = async (req, res, next) => {
  try {
    const facilitiesTypes = await Facility.find();

    if (facilitiesTypes.length === 0) {
      return res.status(200).json({ message: "No Facilities Types found" });
    }
    res.status(200).json(facilitiesTypes);
  } catch (error) {
    console.error('Error fetching facilities:', error);
    next(error);
  }
};
