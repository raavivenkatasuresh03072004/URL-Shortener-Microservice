const express = require('express');
const router = express.Router();
const controller = require('../controllers/shorturl.controller');

router.post('/shorturls', controller.createShortUrl);
router.get('/shorturls/:shortcode', controller.getStats);
router.get('/:shortcode', controller.redirectShortUrl);

module.exports = router;
