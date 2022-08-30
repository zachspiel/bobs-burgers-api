import mongoose, { Schema } from "mongoose";

const EpisodeSchema = new mongoose.Schema({
  _id: {
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
    type: Schema.Types.Mixed,
  },
  totalViewers: {
    type: String,
  },
  url: {
    type: String,
  },
});

export default mongoose.model("EpisodeModel", EpisodeSchema, "episodes");
