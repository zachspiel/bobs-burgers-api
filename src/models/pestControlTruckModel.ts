import mongoose from 'mongoose';

const PestControlTruckSchema = new mongoose.Schema({
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
    type: String,
  },
  url: {
    type: String,
  },
});

export default mongoose.model(
  'PestControlTrucks',
  PestControlTruckSchema,
  'pestControlTruck'
);
