import  mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema({
    voucher_id: {
        type: Number,
        unique: true, 
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    des: {
        type: String,
    },
    booking: {
        type: String, 
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Voucher = mongoose.model('Voucher', voucherSchema);

export default Voucher;
