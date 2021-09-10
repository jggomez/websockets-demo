const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("src/client"));

let messages = [
  {
    author: "Server",
    text: "Hi, What are you doing?",
  },
];

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.emit("messages", messages);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("new-message", (message) => {
    messages.push(message);
    io.emit("messages", messages);
  });
});

server.listen(8080, () => {
  console.log("Server Running localhost:8080");
});

app.get("/Chat", (_, resp) => {
  resp.status(200).send("Welcome Chat Websockets");
});
