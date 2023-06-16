// Require mongoose
const mongoose = require('mongoose')

// Connect to the database
mongoose
    .connect('mongodb://127.0.0.1:27017/react-blog', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

// Create a database variable
const db = mongoose.connection

// Export the database
module.exports = db