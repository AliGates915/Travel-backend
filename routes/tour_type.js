import express from "express";
import {
  createTourType,
  updateTourType,
  deleteTourType,
  getTourType,
  getAllTourType,
} from "../controllers/tour_type.js";
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

// Create a new TourType
router.post("/", verifyAdmin,createTourType);

// Update an existing TourType by ID
router.put("/:id", updateTourType);

// Delete a TourType by ID
router.delete("/:id", deleteTourType);

// Get a specific TourType by ID
router.get("/:id", getTourType);

// Get all TourTypes
router.get("/", getAllTourType);

export default router;
