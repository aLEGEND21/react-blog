// Require Mongoose and create a schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema for the post
const Post = new Schema(
    {
        title: { type: String, required: true },
        summary: { type: String, required: true },
        content: { type: String, required: true },
        authorID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    },
    { timestamps: true },
)

// Export the model
module.exports = mongoose.model('posts', Post)