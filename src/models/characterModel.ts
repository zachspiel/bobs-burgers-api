import mongoose from "mongoose";

const RelativeSchema = new mongoose.Schema({
  _id: {
    select: false,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  wikiUrl: {
    type: String,
  },
});

const CharacterSchema = new mongoose.Schema({
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
  image: {
    type: String,
  },
  gender: {
    type: String,
  },
  hairColor: {
    type: String,
  },
  age: {
    type: String,
  },
  occupation: {
    type: String,
  },
  relatives: {
    type: [RelativeSchema],
    default: undefined,
  },
  firstEpisode: {
    type: String,
  },
  voicedBy: {
    type: String,
  },
  url: {
    type: String,
  },
});

export default mongoose.model("Character", CharacterSchema);
