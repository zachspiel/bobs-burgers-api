import mongoose from "mongoose";

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
  allOccupations: [String],
  occupation: {
    type: String,
  },
  relatives: [
    {
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
        required: true,
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
  url: {
    type: String,
  },
});

export default mongoose.model("CharacterModel", CharacterSchema, "characters");
