// Require modules
const express = require('express');
const UserCtrl = require('../controllers/user-ctrl');

// Create a router
const router = express.Router();

// Create routes for the router
router.post('/user', UserCtrl.createUser);
router.put('/user/:id', UserCtrl.updateUser);
router.delete('/user/:id', UserCtrl.deleteUser);
router.get('/user/:username', UserCtrl.getUserByUsername);
router.get('/users', UserCtrl.getUsers);

// Export the router
module.exports = router;