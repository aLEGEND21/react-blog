const User = require('../models/user-model')

login = async (req, res) => {
    const body = req.body;

    // Check if the request body is empty
    if (!body) {
        return res.status(400).json({
            success: false,
            message: 'You must provide a username and password',
        })
    }

    // Check if the user with the given username and password exists
    await User.findOne({ username: body.username, password: body.password })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect username or password',
                })
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'User logged in',
                    id: user._id,
                    username: user.username,
                })
            }
        })

}

module.exports = {
    login,
}