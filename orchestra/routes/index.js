const router = require('express').Router();
const movie = require('./movie');

router.use('/movie', movie);

module.exports = router;