import express from "express";
import {
  createDestination,
  updateDestination,
  deleteDestination,
  getDestination,
  getAllDestination,
} from "../controllers/destinations.js";
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

// Create a new Destination
router.post("/", verifyAdmin,createDestination);

// Update an existing Destination by ID
router.put("/:id", updateDestination);

// Delete a Destination by ID
router.delete("/:id", deleteDestination);

// Get a specific Destination by ID
router.get("/:id", getDestination);

// Get all Facilities
router.get("/", getAllDestination);

export default router;
