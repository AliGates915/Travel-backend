import express from "express";
import {
  createPackage,
  updatePackage,
  deletePackage,
  getPackage,
  getAllPackage,
} from "../controllers/package.js";
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

// Create a new Package
router.post("/", verifyAdmin,createPackage);

// Update an existing Package by ID
router.put("/:id", updatePackage);

// Delete a Package by ID
router.delete("/:id", deletePackage);

// Get a specific Package by ID
router.get("/:id", getPackage);

// Get all Facilities
router.get("/", getAllPackage);

export default router;
