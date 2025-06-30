import mongoose from "mongoose";

const CharacterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
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
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  hair: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: false,
  },
  allOccupations: {
    type: [String],
    required: true,
  },
  occupation: {
    type: String,

    required: false,
  },
  nicknames: {
    type: [String],
    required: true,
  },
  relatives: [
    {
      _id: {
        type: String,
        select: false,
      },
      name: {
        type: String,
        required: true,
      },
      relationship: {
        type: String,
        required: false,
      },
      wikiUrl: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
  ],
  firstEpisode: {
    type: String,
    required: false,
  },
  voicedBy: {
    type: String,
    required: false,
  },
  wikiUrl: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  __v: {
    type: String,
    select: false,
  },
});

export default mongoose.model("CharacterModel", CharacterSchema, "characters");
