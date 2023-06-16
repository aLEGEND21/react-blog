// Require Mongoose and create a schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema for the user
const User = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }],
    },
    { timestamps: true },
)

// Export the model
module.exports = mongoose.model('users', User)