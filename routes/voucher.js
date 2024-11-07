import { getVoucher } from "../controllers/Voucher.js";
import express from "express";
const router = express.Router();

router.post('/' ,getVoucher);


export default router;