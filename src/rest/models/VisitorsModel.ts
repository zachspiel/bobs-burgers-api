import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("VisitorModel", VisitorSchema, "visitors");
