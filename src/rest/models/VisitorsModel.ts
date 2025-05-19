import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
  _id: {
    type: String,
    select: false,
  },
  id: {
    type: String,
    required: true,
    select: false,
  },
  value: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("VisitorModel", VisitorSchema, "visitors");
