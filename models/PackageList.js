import mongoose from "mongoose";
const { Schema } = mongoose;

const PackageListSchema = new mongoose.Schema(
    {
        packageName: { type: String, required: true },
        tourType: { type: String, required: true },
        facilities: [{ type: String }],
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
      
        rate: {
            type: Number,
            required: true,
        },
        logoPicture: {
            type: String, // assuming you will store the image URL
            // required: true,
        },
        description: {
            type: String,
            required: true,
        },
    }, { timestamps: true });

export default mongoose.model("PackageList", PackageListSchema);
