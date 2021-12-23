import mongoose, { Schema } from 'mongoose';

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
    relatives: [
        {
            type: String,
            required: false,
            default: undefined,
        },
    ],
    url: {
        type: String,
    },
});

export default mongoose.model('Character', CharacterSchema);
