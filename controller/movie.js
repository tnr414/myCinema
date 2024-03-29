const mongoose = require("mongoose");
const Movie = require("../models/movie");
const multer = require("multer");
const fs = require("fs");

exports.getAllMovies = (req, res) => {
    Movie.find()
        .then((movies) =>
            res.status(200).json({
                count: movies.length,
                movies: movies,
            })
        )
        .catch((err) => res.status(500).json({ error: err }));
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null,  __dirname);
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage }).single("image");

exports.addMovie = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log('error 1', err);
            res.status(500).json(err);
        }
        else {
            fs.readFile(req.file.path, function (err, data) {
                if (err) throw err;
                else {
                    const contentType = req.file.mimetype;
                    const newMovie = new Movie({
                        _id: mongoose.Types.ObjectId(),
                        title: req.body.title,
                        numberInStock: req.body.numberInStock,
                        genre: req.body.genre,
                        image: { data, contentType },
                        description: req.body.description,
                        rate: req.body.rate,
                        movieLength: req.body.movieLength,
                        trailerLink: req.body.trailerLink
                    });

                    //Saving new movie in db
                    newMovie.save((err, movie) => {
                        if (err) {
                            console.log('error 2', err);
                            res.status(500).json({ error: err });
                        } 
                        else {
                            res.status(201).json({
                                message: "A new movie added.",
                                movie: movie,
                            });
                        }
                    });
                }
            });
        }
    });
};
