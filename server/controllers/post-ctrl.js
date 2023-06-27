const User = require('../models/user-model')
const Post = require('../models/post-model')


// Create a new post
createPost = async (req, res) => {
    const body = req.body;

    // Check if the request body is empty
    if (!body) {
        return res.status(400).json({
            success: false,
            message: 'You must provide a post',
        })
    }

    // Create a new post
    post = new Post(body)

    // Check if the post was created
    if (!post) {
        return res.status(400).json({ success: false, error: err })
    }

    // Save the post and handle errors
    post
        .save()
        .then(() => {
            // Add the post to the user's posts
            User.findByIdAndUpdate(req.body.author, { $push: { posts: post._id } })
                .catch(err => console.log(err));
            return res.status(201).json({
                success: true,
                id: post._id,
                message: 'Post created',
            })
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json({
                success: false,
                error: error,
                message: 'Post not created',
            })
        }
        )
}


// Update a post
updatePost = async (req, res) => {
    return res.status(501).json({ message: 'Not implemented' })
}


// Delete a post
deletePost = async (req, res) => {
    return res.status(501).json({ message: 'Not implemented' })
}


// Get a post by ID
getPostById = async (req, res) => {
    await Post.findOne({ _id: req.params.id })
        .populate('author')
        .then((post) => {
            if (!post) {
                return res
                    .status(404)
                    .json({ success: false, message: 'Post not found' })
            } else {
                return res.status(200).json({ 
                    success: true, 
                    ...post._doc,
                })
            }
        })
        .catch(err => console.log(err));
}


// Get all posts
getPosts = async (req, res) => {
    await Post.find({})
        .populate('author')
        .then((posts) => {
            return res.status(200).json({ success: true, data: posts })
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        });
}


// Export the controller functions
module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getPostById,
}