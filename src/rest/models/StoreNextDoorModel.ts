import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
  _id: {
    type: String,
    select: false,
  },
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  season: {
    type: Number,
    required: true,
  },
  episode: {
    type: Number,
    required: true,
  },
  episodeUrl: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export default mongoose.model("StoreNextDoorModel", StoreSchema, "storeNextDoor");
