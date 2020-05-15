var http = require("http");
var socketio = require("socket.io");
var socketioJwt = require("socketio-jwt");
var fs = require("fs");

var server = http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(fs.readFileSync("index.html", "utf-8"));
  })
  .listen(3000);

var io = socketio.listen(server);

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
  });

  socket.on("send_message", function (data) {
    // todo
  });

  socket.on("disconnect", function (data) {
    // todo
  });
});
