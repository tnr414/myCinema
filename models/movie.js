const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: { type: String, required: true },
    numberInStock: { type: Number, required: true },
    genre: { type: String, required: true },
    image: { data: Buffer, contentType: String },
    rate: { type: Number, required: true },
    description: { type: String, required: true },
    trailerLink: { type: String, required: true },
    movieLength: { type: String, required: true },
});

module.exports = mongoose.model("Movie", movieSchema, "movies");