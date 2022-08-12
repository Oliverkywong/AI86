// Imports

import http from "http";
import express from "express";
import expressSession from "express-session";
import { Server as socketIO } from "socket.io";
import { logger } from "./util/logger";
import { formatMessage } from "./util/moment";
import { userJoin, getCurrentUser, userLeave, getRoomUsers, roomCreateOrJoin } from "./util/userSocket"
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

app.use(express.static("public"));
// Routes
app.use(userRoutes);
app.use(gameRoutes);

// let rooms = {};

// function makeid(length:number) {
//   let  result = '';
//   let  num= '0123456789';
//   let  Length = num.length;
//   for ( let  i = 0; i < length; i++ ) {
//      result += num.charAt(Math.floor(Math.random() * Length));
//   }
//   return result;
// }

// let game = io.of('/game')
// game.on('connection', function (socket) {
  // socket.on('start', function () {
  //   let roomid = makeid(4)
  //   rooms['id'] = roomid
  //   socket.emit('roomid', roomid)

  //   socket.join(roomid)
  //   // socket.number = 1
  //   socket.emit('init', 1)
  // })

  // socket.on('join', function (roomid) {
  //   const room = io.sockets.adapter.rooms[roomid]
  //   let allusers;
  //   if (room) {
  //     allusers = room.sockets;
  //   }
  //   let numusers = 0
  //   if (allusers) {
  //     numusers = Object.keys(allusers).length
  //   }

  //   if (numusers===0){
  //     socket.emit('unknown')
  //     return;
  //   }else if (numusers > 1){
  //     socket.emit('full')
  //     return;
  //   }
  //   rooms['id'] = roomid
  //   socket.join(roomid)
  //   // socket.number = 2
  //   socket.emit('init', 2)
  // })
  // socket.emit('otherplayer', {x:10, y:10})
//   socket.on('playerlocation', (location) =>  {
//     socket.emit('remoteplayer', location)
//     // console.log(location)
//   })
// })

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
  // console.log('New WS Connection...');
  socket.on('joinRoom', ({ username, room }) => {
  const user = userJoin(socket.id, username, roomCreateOrJoin(room));
  console.log(user.room);
  socket.join(user.room);
      // Welcome user
  socket.emit('message', formatMessage(botName, 'Welcome to game lobby'))

  // Broadcast when a user connects
  socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

  // Send user and room info
  io.to(user.room).emit('roomUsers', {
    room: user.room,
    users: getRoomUsers(user.room)
  });
    // } else {
    //   socket.emit('message', formatMessage(botName, 'Test'))
    // }
  });

  socket.on("checkStatus", (args, callback) => {
    console.log("Length: " + Object.keys(getRoomUsers(args)).length);
    if(Object.keys(getRoomUsers(args)).length < 3){
      callback({
        status: true
      });
    }
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id)
    if (user) {
      io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`))

      // Send user and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });

    }
  });

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);
    // console.log(msg);
    io.to(user.room).emit('message', formatMessage(user.username, msg))
  });
});