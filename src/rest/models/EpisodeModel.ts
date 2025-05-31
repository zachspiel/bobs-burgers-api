import mongoose, { Schema } from "mongoose";

const EpisodeSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
  },
  productionCode: {
    type: String,
    required: true,
  },
  airDate: {
    type: String,
    required: true,
  },
  season: {
    type: Number,
    required: true,
  },
  episode: {
    type: Number,
    required: true,
  },
  totalViewers: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  wikiUrl: {
    type: String,
    required: true,
  },
  __v: {
    type: String,
    select: false,
  },
});

export default mongoose.model("EpisodeModel", EpisodeSchema, "episodes");
