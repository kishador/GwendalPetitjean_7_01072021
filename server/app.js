const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const app = express();
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');
const requireAuth  = require('./middleware/requireAuth.js')
const path = require('path');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type', 'authorization'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));
app.get('/jwtid', requireAuth, (req, res) => {
	console.log(res.data)
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

const db = require("./models");
db.sequelize.sync();

app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

module.exports = app;
