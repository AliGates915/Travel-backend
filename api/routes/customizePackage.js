import express from "express";
import {
    createCustomizePackage,
    getAllCustomizePackages,
    getCustomizePackageById,
    updateCustomizePackage,
    deleteCustomizePackage,
} from "../../controllers/customizePackage.js";

import { verifyAdmin } from '../../utils/verifyToken.js';

const router = express.Router();

router.post("/", createCustomizePackage);
router.get("/", getAllCustomizePackages);
router.get("/:id", getCustomizePackageById);
router.put("/:id",verifyAdmin, updateCustomizePackage);
router.delete("/:id", verifyAdmin, deleteCustomizePackage);

export default router;
