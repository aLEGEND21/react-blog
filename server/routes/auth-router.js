// Require modules
const express = require('express');
const AuthCtrl = require('../controllers/auth-ctrl');

// Create a router
const router = express.Router();

// Create routes for the router
router.post('/login', AuthCtrl.login);

// Export the router
module.exports = router;