import mongoose from "mongoose";
const { Schema } = mongoose;

const DestinationSchema = new mongoose.Schema(
  {
    countryName: {
      type: String, 
      required: true,

    },
    cityName: { 
      type: String,
      required: true,
    },
    destinationName: {       
      type: String,
    }

  },
  { timestamps: true }
);

export default mongoose.model("Destination", DestinationSchema);
