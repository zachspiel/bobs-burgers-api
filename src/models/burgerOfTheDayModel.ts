import mongoose, { Schema } from "mongoose";

const BurgerOfTheDaySchema = new mongoose.Schema({
  _id: {
    select: false,
  },
  id: {
    type: Number,
    required: true,
  },
  burgers: {
    type: [String],
  },
  season: {
    type: Number,
  },
  episode: {
    type: String,
  },
  episodeName: {
    type: String,
  },
  url: {
    type: String,
  },
});

export default mongoose.model("BurgerOfTheDay", BurgerOfTheDaySchema, "burgerOfTheDay");
