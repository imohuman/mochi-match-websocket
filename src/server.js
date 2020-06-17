const socketio = require("socket.io");
const redis = require("redis");
const fs = require("fs");

const server = require("http").createServer();

const io = socketio(server);
io.set("heartbeat interval", 5000);
io.set("heartbeat timeout", 15000);

const sub = redis.createClient(
  Number(process.env.REDIS_PORT) || 6379,
  process.env.REDIS_HOST || "localhost"
);
sub.subscribe("channel_1");

var user_name = "";
var room_id = "";

sub.on("message", function (channel, message) {
  var m = JSON.parse(message);
  console.log(m);
  chat.to(room_id).emit("msg", message);
});
const chat = io.of("chatroom");
chat.on("connection", function (socket) {
  socket.on("join_req", function (data) {
    console.log("join");
    console.log(data);
    user_name = data.user.user_name;
    room_id = data.room_id;
    socket.join(room_id);
    socket.broadcast.to(room_id).emit("notify_entry", data);
  });

  socket.on("start_input", function (data) {
    console.log("input start");
    socket.broadcast
      .to(room_id)
      .emit("user_input_start", { user_name: user_name });
  });

  socket.on("stop_input", function (data) {
    console.log("stop input");
    socket.broadcast
      .to(room_id)
      .emit("user_input_stop", { user_name: user_name });
  });

  socket.on("disconnect", function (data) {
    socket.leave(room_id);
    console.log(data);
    // todo
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
