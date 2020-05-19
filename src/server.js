const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const socketioJwt = require("socketio-jwt");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

var chat = io.of("/chat").on("connection", function (socket) {
  socket.on("join_req", function (data) {
    // todo
  });

  socket.on("send_message", function (data) {
    // todo
  });

  socket.on("disconnect", function (data) {
    // todo
  });
});

// auth setting
chat.use(
  socketioJwt.authorize({
    secret: "keyData",
    handshake: true,
  })
);

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
