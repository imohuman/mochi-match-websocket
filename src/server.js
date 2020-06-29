const socketio = require('socket.io');
const server = require('http').createServer();
const io = socketio(server);
io.set('heartbeat interval', 5000);
io.set('heartbeat timeout', 15000);

//const redis = require('redis');
//const sub = redis.createClient(
//  Number(process.env.REDIS_PORT) || 6379,
//  process.env.REDIS_HOST || 'localhost'
//);
//sub.subscribe('channel_1');

//sub.on('message', function (channel, message) {
//  var m = JSON.parse(message);
//  chat.to(room_id).emit('msg', m);
//});
const chat = io.of('chatroom');
chat.on('connection', function (socket) {
  var user_name = '';
  var room_id = '';
  var user_id = '';
  socket.on('join_req', function (data) {
    console.log(data);
    user_name = data.user.user_name;
    room_id = data.room_id;
    user_id = data.user.user_id;
    socket.join(room_id);
    socket.broadcast.to(room_id).emit('notify_entry', data);
  });

  socket.on('start_input', function (data) {
    console.log('input start');
    socket.broadcast
      .to(room_id)
      .emit('user_input_start', { user_name: user_name });
  });

  socket.on('stop_input', function (data) {
    console.log('stop input');
    socket.broadcast
      .to(room_id)
      .emit('user_input_stop', { user_name: user_name });
  });

  socket.on('disconnect', function (data) {
    //socket.leave(room_id);
    console.log(data);
      socket.broadcast.to(room_id).emit('notify_leave', { "user_id": user_id });
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
