import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ linit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

app.get("/home", (req, res) => {
  return res.json({ Hello: "world" });
});

const start = async () => {
  app.set("mongo_user");
  const connectionDB = await mongoose.connect(
    "mongodb+srv://yashrane332:MongoRane2121@cluster0.sepxrdy.mongodb.net/"
  );
  console.log(`MONGO connected DB HOst: ${connectionDB.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("Listen on port 8000");
  });
};

start();

// // index.js
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = 8000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // HTTP server setup
// const server = http.createServer(app);

// // Socket.io setup
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//   },
// });

// // Socket connection
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// // Routes
// app.get('/home', (req, res) => {
//   res.send('Home Page!');
// });

// // Start server
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
