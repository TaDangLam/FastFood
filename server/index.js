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

// socket.io
import { createServer } from "http";
import { Server } from "socket.io";
const server = createServer(app);
export const io = new Server(server, {
    cors: {
        origin: `${process.env.URL_FRONTEND}`,
        methods: ["GET", "POST"] // Thêm các phương thức bạn sử dụng
    }
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);
    
    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
    })
});

server.listen(PORT, () => console.log(`Server listening http://localhost:${PORT}`));
