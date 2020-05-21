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
  socket.on("join_req", function (data) {
    //参加に必要な変数宣言
    var user=data.userid;
    var room=data.roomid;
    var limit=data.roomlimit;
    socket.join(room);
    //一通り動くかチェック
    console.log(user,room,limit);
    console.log(io.sockets.adapter.rooms[room]);
    //if(limit)
    socket.join('room');
    socket.emit("asd", { a: "aa" });
  });

  socket.on("send_chat", function (data) {
    // todo
  });

  socket.on("disconnect", function (data) {
    // todo
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
