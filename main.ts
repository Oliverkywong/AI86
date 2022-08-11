// Imports

import http from "http";
import express from "express";
import expressSession from "express-session";
import { Server as socketIO } from "socket.io";
import { logger } from "./util/logger";
import { formatMessage } from "./util/moment";
import { userRoutes } from "./util/userRoutes";
import { gameRoutes } from "./util/gameRoutes";
import { knex } from "./util/middlewares";
import { userService } from "./services/userService";
import { userController } from "./controllers/userController";
import { createUserRoutes } from "./util/userRoutes";

// Constants

const app = express();
const server = new http.Server(app);
const io = new socketIO(server);
const botName = 'AI86 BOT';
app.use(express.json());
app.use(express.urlencoded());

app.use(
  expressSession({
    secret: "whatever",
    resave: true,
    saveUninitialized: true,
  })
);

let sessions = {};
app.use((req, res, next) => {
  sessions = req.session;
  console.log(sessions);
  next();
});

// Routes
app.use(userRoutes);
app.use(gameRoutes);

app.use(express.static("public"));

// User Related

const userservice = new userService(knex);
const usercontroller = new userController(userservice)
app.use(createUserRoutes(usercontroller));

app.use(express.static("private"));

const port = process.env.PORT || 8989
server.listen(port, function () {
  logger.info(`listening on port ${port}`);
});

// Socket IO Chat Related

io.on('connection', socket => {
  console.log('New WS Connection...');

  socket.emit('message', formatMessage(botName, 'Welcome to game lobby'))

  // Broaddcast when a user connects
  socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

  // Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName, 'A user has left the chat'))
  });

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    // console.log(msg);
    io.emit('message', formatMessage('USER', msg))
  });
});