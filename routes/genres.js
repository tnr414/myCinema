const express = require('express');
const router = express.Router();

const { GET_ALL_GENRES, ADD_GENRE } = require('../controller/genre');

router.get('/', GET_ALL_GENRES);
router.post('/addgenre', ADD_GENRE);

module.exports = router;