const express = require('express');
const router = express.Router();

const { getAllMovies, addMovie } = require('../controller/movie');

router.get('/', getAllMovies);
router.post('/addmovie', addMovie);

module.exports = router;