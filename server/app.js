const express = require("express");
const app = express();

const Db = require('./db/db.js');
const path = require("path");
const cors = require ("cors");
const helmet = require ("helmet");
const {requireAuth} = require('./middleware/auth.js');
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');
const postRoutes = require ('./routes/post.js');
const userRoutes = require ('./routes/user.js');
const commentRoutes = require ('./routes/comment.js');

Db.sync()
.then((console.log("Connexion a la bdd")))
.catch(error => console.log(error))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())
app.use(helmet())

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true
}
))

  app.get('/jwtid', requireAuth, (req, res) => {

    res.json({userId: req.userId})
  });

app.use('/images', express.static(path.join('./images')));

app.use( userRoutes );
app.use( postRoutes );
app.use( commentRoutes);

module.exports = app 