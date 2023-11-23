const express = require('express');
const router = express.Router();

const { signUp, signIn, updateUser } = require('../controller/user');

router.post("/signup", signUp);
router.post("/login", signIn);
router.patch("/:userID", updateUser);

module.exports = router;