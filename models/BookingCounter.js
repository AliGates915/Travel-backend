import mongoose from 'mongoose';

const bookingCounterSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // e.g., 'bookingNumber'
    sequenceValue: { type: Number, default: 0 }
});

const BookingCounter = mongoose.model('BookingCounter', bookingCounterSchema);

export default BookingCounter;
