const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const socketioJwt = require("socketio-jwt");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

io.use(
  socketioJwt.authorize({
    secret: "keyData",
    handshake: true,
  })
);

io.sockets.on("connection", function (socket) {
  var room = "";
  var name = "";
  var id = socket.id;

  socket.on("join_req", function (data) {
    // todo
    socket.emit("asd", { a: "aa" });
  });

  socket.on("send_message", function (data) {
    // todo
  });

  socket.on("disconnect", function (data) {
    // todo
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
