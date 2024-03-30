import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import MongoConnect from './lib/mongodb.js';
import routes from './routes/index.js';

dotenv.config();
const PORT = process.env.PORT || 4000;

// Connect Database
MongoConnect();

// Middleware
app.use(cors());
// app.use(bodyParser.json())
app.use(express.json());
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));


//Routes
routes(app);

app.listen(PORT, () => console.log(`Server listening http://localhost:${PORT}`));