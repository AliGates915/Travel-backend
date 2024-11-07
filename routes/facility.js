import express from "express";
import {
  createFacility,
  updateFacility,
  deleteFacility,
  getFacility,
  getAllFacility,
} from "../controllers/facility.js";
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

// Create a new Facility
router.post("/", verifyAdmin,createFacility);

// Update an existing Facility by ID
router.put("/:id", updateFacility);

// Delete a Facility by ID
router.delete("/:id", deleteFacility);

// Get a specific Facility by ID
router.get("/:id", getFacility);

// Get all Facilities
router.get("/", getAllFacility);

export default router;
