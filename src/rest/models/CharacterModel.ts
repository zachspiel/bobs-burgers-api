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
  allOccupations: [String],
  occupation: {
    type: String,
  },
  nicknames: [String],
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
      },
      wikiUrl: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  firstEpisode: {
    type: String,
  },
  voicedBy: {
    type: String,
  },
  wikiUrl: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

export default mongoose.model("CharacterModel", CharacterSchema, "characters");
