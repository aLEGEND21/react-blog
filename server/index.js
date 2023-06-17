// Require modules
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const db = require('./db');
const userRouter = require('./routes/user-router');
const postRouter = require('./routes/post-router');
const authRouter = require('./routes/auth-router');
const mediaRouter = require('./routes/media-router');

// Create an express app
const app = express();

// Configure the app
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

// Configure the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Create the home route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Configure the api routes
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', authRouter);
app.use('/api', mediaRouter);

// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

// Tutorial https://medium.com/swlh/how-to-create-your-first-mern-mongodb-express-js-react-js-and-node-js-stack-7e8b20463e66