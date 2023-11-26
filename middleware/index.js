const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const middlewareRoute = require('./utils/auth');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
//session
app.use(cookieParser()); // Add cookie parser middleware

// Routes
app.use('/', middlewareRoute);

// Handle unspecified routes
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'fail',
		message: 'Specified route not found',
	});
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
	console.log(`Middleware Management Microservice is listening on port ${PORT}`)
);
