const express = require("express");
const app = express();

const Db = require('./db/db.js');
const path = require("path");
const cors = require ("cors");
const helmet = require ("helmet");


const postRoutes = require ('./routes/post.js');
const userRoutes = require ('./routes/user.js');
const commentRoutes = require ('./routes/comment.js');

Db.sync()
.then((console.log("Connexion a la bdd")))
.catch(error => console.log(error))

app.use(cors())
app.use(helmet())

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/images', express.static(path.join('./images')));

app.use( userRoutes );
app.use( postRoutes );
app.use( commentRoutes);

module.exports = app 