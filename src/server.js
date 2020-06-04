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
  var user="";
  var room="";
  let nowTyping = 0;
  //参加処理
  socket.on("join_req", function (data) {
    room = data.room_id;
    socket.join(room);
    socket.broadcast.to(room).emit("notify_entry", data);
  });

  socket.on("send_chat", function (data) {
    var inMessage = user+"さんが入室しました。";
  });

  //タイピング開始
  socket.on("now_typing",function(){
    if(nowTyping <=0){
      socket.broadcast.emit("now_typing",userhash[socket.id])
    }
      nowTyping++;
      setTimeout(function(){
        nowTyping--;
        if(nowTyping<=0){
          socket.broadcast.emit("stop_typing");
        }
      },3000);
  });
  //タイビング終了
  socket.on("stop_typing",function(){
    nowTyping = 0;
    socket.broadcast.emit("stop_typing");
  });

  socket.on("disconnect", function (data) {
    console.log(data);
    // todo
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
