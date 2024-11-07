import express from "express";
import {
  createPackageList,
  updatePackageList,
  deletePackageList,
  getPackageList,
  getAllPackageList,
} from "../controllers/packageList.js";
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

// Create a new PackageList
router.post("/", verifyAdmin,createPackageList);

// Update an existing PackageList by ID
router.put("/:id", updatePackageList);

// Delete a PackageList by ID
router.delete("/:id", deletePackageList);

// Get a specific PackageList by ID
router.get("/:id", getPackageList);

// Get all Facilities
router.get("/", getAllPackageList);

export default router;
