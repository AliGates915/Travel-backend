import Voucher from '../models/Voucher.js';
import User from '../models/User.js'; 

// Express route to create a voucher
export const getVoucher = async (req, res) => {
    const { users, des, booking, date, amount } = req.body;

    try {
        // Find the user by username
        const userId = await User.findOne({ username: users });
        if (!userId) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Get the last voucher_id from the database
        const lastVoucher = await Voucher.findOne().sort({ voucher_id: -1 });
        const newVoucherId = lastVoucher ? lastVoucher.voucher_id + 1 : 1; // Start from 1 if no vouchers exist

        // Create new voucher
        const newVoucher = new Voucher({
            voucher_id: newVoucherId,
            users: userId._id, // Use the user's ID
            des,
            booking,
            date,
            amount,
        });

        await newVoucher.save();

        res.status(201).json({ message: 'Voucher created successfully', voucher: newVoucher });
    } catch (error) {
        console.error("Error creating voucher:", error);
        res.status(500).json({ message: 'Error creating voucher' });
    }
};
