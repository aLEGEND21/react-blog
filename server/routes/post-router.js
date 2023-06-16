// Require modules
const express = require('express');
const PostCtrl = require('../controllers/post-ctrl');

// Create a router
const router = express.Router();

// Create routes for the router
router.post('/post', PostCtrl.createPost);
router.put('/post/:id', PostCtrl.updatePost);
router.delete('/post/:id', PostCtrl.deletePost);
router.get('/post/:id', PostCtrl.getPostById);
router.get('/posts', PostCtrl.getPosts);

// Export the router
module.exports = router;