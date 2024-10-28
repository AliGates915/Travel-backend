import mongoose from "mongoose";
const { Schema } = mongoose;

const PackageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String, 
      required: true,

    }
  },
  { timestamps: true }
);

export default mongoose.model("Package", PackageSchema);
