import mongoose from "mongoose";

const DEFAULT_SCHEMA = {
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
  },
  episode: {
    type: String,
  },
  url: {
    type: String,
  },
};

const DEFAULT_SCHEMA_V2 = {
  ...DEFAULT_SCHEMA,
  episode: { type: Number },
  episodeUrl: { type: String },
};
const PestControlTruckV2Schema = new mongoose.Schema({
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
  },
  episode: {
    type: Number,
  },
  episodeUrl: {
    type: String,
  },
  url: {
    type: String,
  },
});

export default mongoose.model(
  "PestControlTruckModelV2",
  PestControlTruckV2Schema,
  "pestControlTruckV2"
);
