const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const socketioJwt = require("socketio-jwt");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

var chat = io.of("/chatroom").on("connection", function (socket) {
  //参加に必要な変数
  var user = socket.id;
  var room = "";
  socket.on("join_req", function (data) {
    console.log("join");
    room = data.room_id;
    socket.join(room);
    socket.broadcast.to(room).emit("notify_entry", data);
  });

  socket.on("start_input", function (data) {
    console.log("input start");
    socket.broadcast.to(room).emit("user_input", { user: user });
  });

  socket.on("stop_input", function (data) {
    console.log("stop input");
    socket.broadcast.to(room).emit("user_input_stop", { user: user });
  });

  socket.on("send_chat", function (data) {
    var inMessage = user + "さんが入室しました。";
  });

  socket.on("disconnect", function (data) {
    console.log(data);
    // todo
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
