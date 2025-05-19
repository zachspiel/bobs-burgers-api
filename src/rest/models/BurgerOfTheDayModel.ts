import mongoose from "mongoose";

const BurgerOfTheDaySchema = new mongoose.Schema({
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
  },
  price: {
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
  "BurgerOfTheDayModel",
  BurgerOfTheDaySchema,
  "burgerOfTheDay"
);
