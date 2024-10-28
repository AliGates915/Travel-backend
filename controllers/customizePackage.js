import CustomizePackage from "../models/CustomizePackage.js";
import BookingCounter from '../models/BookingCounter.js'; 
import mongoose from "mongoose";
// Create a new CustomizePackage

async function getNextBookingNumber() {
    const counter = await BookingCounter.findOneAndUpdate(
        { _id: 'bookingNumber' },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
    );

    console.log('Counter Value:', counter); // Debugging: Check the counter value

    if (!counter || !counter.sequenceValue) {
        throw new Error('Failed to retrieve booking number');
    }

    const bookingNumber = String(counter.sequenceValue).padStart(4, '0'); // Ensure it is padded and converted to string
    console.log('Generated Booking Number:', bookingNumber); // Debugging: Check the generated booking number
    return bookingNumber;
}

export const createCustomizePackage = async (req, res) => {
    
    console.log("Request Body:", req.body);
    try {
        const booking = await getNextBookingNumber();

        const newCustomizePackage = new CustomizePackage({
            tourType: req.body.tourType,
            facilities: req.body.facilities,
            username: req.body.username,
            destinationName: req.body.destinationName,
            countryName: req.body.countryName,
            totalDays: req.body.totalDays,
            days: req.body.days,
            nights: req.body.nights,
            dateFrom: req.body.dateFrom,
            dateTo: req.body.dateTo,
            totalAdult: req.body.totalAdult,
            totalChild: req.body.totalChild,
            vendor: req.body.vendor,
            totalInfant: req.body.totalInfant,
            totalAmount: req.body.totalAmount,
            installmentDetails: req.body.installmentDetails,
            booking, // auto-generated booking number
        });

        await newCustomizePackage.save();
        res.status(201).json(newCustomizePackage);
    } catch (error) {
        console.error("Error creating CustomizePackage:", error);
        res.status(500).json({ message: "Error creating CustomizePackage" });
    }
};

// Get all CustomizePackages
export const getAllCustomizePackages = async (req, res) => {
    try {
        const customizePackages = await CustomizePackage.find();
        res.status(200).json(customizePackages);
    } catch (error) {
        console.error("Error fetching CustomizePackages:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Get a CustomizePackage by ID
export const getCustomizePackageById = async (req, res) => {
    try {
        const customizePackage = await CustomizePackage.findById(req.params.id);
        if (!customizePackage) {
            return res.status(404).json({ message: "CustomizePackage not found" });
        }
        res.status(200).json(customizePackage);
    } catch (error) {
        console.error("Error fetching CustomizePackage:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Update a CustomizePackage by ID
export const updateCustomizePackage = async (req, res) => {
    try {
        const updatedCustomizePackage = await CustomizePackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCustomizePackage) {
            return res.status(404).json({ message: "CustomizePackage not found" });
        }
        res.status(200).json(updatedCustomizePackage);
    } catch (error) {
        console.error("Error updating CustomizePackage:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Delete a CustomizePackage by ID
export const deleteCustomizePackage = async (req, res) => {
    try {
        const deletedCustomizePackage = await CustomizePackage.findByIdAndDelete(req.params.id);
        if (!deletedCustomizePackage) {
            return res.status(404).json({ message: "CustomizePackage not found" });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting CustomizePackage:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
