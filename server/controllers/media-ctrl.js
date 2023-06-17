const fs = require('fs');
const uuid = require('uuid');

const mediaFolderPath = './media'

// Declare the callback for the media upload route
uploadMedia = async (req, res) => {
    try {
        // Check if there is a file in the request
        const file = req.files.File;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'You must provide a file',
            })
        }

        // Generate a unique filename
        const filename = `${uuid.v4()}.${file.mimetype.split('/')[1]}`;

        // Upload the file to the server
        await file.mv(`${mediaFolderPath}/${filename}`)

        // Send a success message to the client
        return res.status(200).json({
            success: true,
            message: 'File uploaded',
            file: file,
            filename: filename
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'File not uploaded',
            error: error.message,
        })
    }
}

getMedia = async (req, res) => {
    // Check if the file exists
    const filename = req.params.filename;
    if (!fs.existsSync(`${mediaFolderPath}/${filename}`)) {
        return res.status(404).json({
            success: false,
            message: 'File not found',
        })
    } else {
        // Send the file to the client
        return res.status(200).sendFile(`${mediaFolderPath}/${filename}`, { root: '.' })
    }
}

module.exports = {
    uploadMedia,
    getMedia
}