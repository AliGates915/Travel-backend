import mongoose from "mongoose";
const { Schema } = mongoose;

const FacilitySchema = new mongoose.Schema(
  {
    facilityName: {
      type: String, // Change this to String instead of [String]
      required: true,

    },
    tourName: { // Add the tourName field to save the selected tour type
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Facility", FacilitySchema);
