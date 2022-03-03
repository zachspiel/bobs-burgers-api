import mongoose from 'mongoose';

const EndCreditsSequenceSchema = new mongoose.Schema({
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
  'EndCredit',
  EndCreditsSequenceSchema,
  'endCreditsSequence'
);
