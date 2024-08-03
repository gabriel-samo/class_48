const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

//create express
const app = express();

//create http server
const server = http.createServer(app);

//initialize socket.io
const io = socketIo(server);

//io => WebSocket depends on events....
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("red-to-white", (color) => {
    console.log(`changed background color to ${color}`);
    io.emit("red-to-white", color);
  });

  socket.on("green-to-white", (color) => {
    console.log(`changed background color to ${color}`);
    io.emit("green-to-white", color);
  });

  //listen for disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//serve static files from the public directory
app.use(express.static(__dirname + "/public"));

//Define a route to server index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server is on http://localhost:${PORT}`);
});
