import express from "express";
import socketIo from "socket.io";
import http from "http";

// create express app
const app = express();

// create http server
const server = http.createServer(app);

// initialize socket.io
const io = new socketIo.Server(server);

// io depends on events...
io.on("connection", (socket) => {
  console.log("A user connected");

  // listen for incoming chat message
  socket.on("chat message", (msg) => {
    console.log("Message: " + msg);
    // broadcast the message to all connected clients
    io.emit("chat message", msg);
  });

  // listen for disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// serve static files from public dir
app.use(express.static(__dirname + "/public"));

// define route for serve index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// listen on port 8000
server.listen(8000, () => {
  console.log("Server is running on  http://localhost:8000");
});
