// Require modules
const express = require('express');
const MediaCtrl = require('../controllers/media-ctrl');

// Create a router
const router = express.Router();

// Create routes for the router
router.post('/media/upload', MediaCtrl.uploadMedia);
router.get('/media/:filename', MediaCtrl.getMedia)

// Export the router
module.exports = router;