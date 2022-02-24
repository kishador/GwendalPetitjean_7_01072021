import express from "express";
const app = express();

import Db from './db/db.js';
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import {fileURLToPath} from 'url';

import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';
import commentRoutes from './routes/comment.js';

Db.sync()
.then((console.log("Connexion a la bdd")))
.catch(error => console.log(error))

app.use(cors())
app.use(helmet())

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images', express.static(path.join( __dirname, 'images')));

app.use( userRoutes );
app.use( postRoutes );
app.use( commentRoutes);

export default app 