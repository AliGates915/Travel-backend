import mongoose from "mongoose";
const { Schema } = mongoose;

const TourTypeSchema = new mongoose.Schema(
  {
    tourName: {
      type: String,
      required: true,
    }  
    },
  { timestamps: true }
);

export default mongoose.model("Tour_Type", TourTypeSchema);
