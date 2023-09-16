import mongoose, { Schema } from "mongoose";

const EpisodeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  productionCode: {
    type: String,
  },
  airDate: {
    type: String,
  },
  season: {
    type: Number,
  },
  episode: {
    type: Number,
  },
  totalViewers: {
    type: String,
  },
  url: {
    type: String,
  },
  wikiUrl: {
    type: String,
  },
});

export default mongoose.model("EpisodeModel", EpisodeSchema, "episodes");
