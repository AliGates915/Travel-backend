
import mongoose from "mongoose";

const customizePackageSchema = new mongoose.Schema({
    tourType: {
        type: String,
        required: true,
    },
    facilities: {
        type: [String],
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    destinationName: {
        type: String,
        required: true,
    },
    countryName: {
        type: String,
        required: true,
    },
    totalDays: {
        type: Number,
        required: true,
    },
    days: {
        type: Number,
        required: true,
    },
    nights: {
        type: Number,
        required: true,
    },
    dateFrom: {
        type: Date,
        required: true,
    },
    dateTo: {
        type: Date,
        required: true,
    },
    totalAdult: {
        type: Number,
        required: true,
    },
    totalChild: {
        type: Number,
        required: true,
    },
    vendor: {
        type: String,
        required: true,
    },
    totalInfant: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },  booking: { type: String, required: true },
    installmentDetails: {
        installmentCount: {
            type: Number,
            required: false, 
        },
        installmentAmount: {
            type: Number,
            required: false, 
        },
    },
});

// Default export
const CustomizePackage = mongoose.model("CustomizePackage", customizePackageSchema);
export default CustomizePackage;
