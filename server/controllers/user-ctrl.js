const User = require('../models/user-model')


// Create a new user
createUser = async (req, res) => {
    const body = req.body

    // Check if the request body is empty
    if (!body) {
        return res.status(400).json({
            success: false,
            message: 'You must provide a user',
        })
    }

    // Check that the username is not taken
    await User.findOne({ username: body.username })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'Username is already taken',
                })
            }

            // Create a new user
            user = new User(body)

            // Check if the user was created
            if (!user) {
                return res.status(400).json({ success: false, error: err })
            }

            // Save the user and handle errors
            user
                .save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        id: user._id,
                        message: 'User created',
                    })
                }
                )
                .catch(error => {
                    return res.status(400).json({
                        error,
                        message: 'User not created',
                    })
                }
                )
                });
}


// Update a user
updateUser = async (req, res) => {
    return res.status(501).json({ message: 'Not implemented' })
}


// Delete a user
deleteUser = async (req, res) => {
    return res.status(501).json({ message: 'Not implemented' })
}


// Get a user by username
getUserByUsername = async (req, res) => {
    await User.findOne({ username: req.params.username })
        .then((user) => {
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, message: 'User not found' })
            }
            return res.status(200).json({ success: true, data: user })
        })
        .catch(err => console.log(err))
}


// Get all users
getUsers = async (req, res) => {
    await User.find({})
        .then((users) => {
            if (!users.length) {
                return res
                    .status(404)
                    .json({ success: false, message: 'No users found' })
            }
            return res.status(200).json({ success: true, data: users })
        })
        .catch(err => console.log(err))
}


// Export the controller
module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserByUsername,
}