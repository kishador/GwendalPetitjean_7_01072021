
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const userRoutes = require('./routes/user.js');
const postRoutes = require('./routes/post.js');
const mysql = require('mysql');

const path = require('path');



const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "P@store27",
  database: "cruddatabase"
});
app.use(db);
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


module.exports = app;