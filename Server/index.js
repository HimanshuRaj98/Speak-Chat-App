const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const PORT = 5000;

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`A user connected : ${socket.id}`);

  socket.on("send-message", (messages) => {
    console.log(messages);
    io.emit("group-message", messages)
  });
  socket.on("disconnet", () => console.log("User Disconneted"));
});
server.listen(PORT, () => console.log(`Server Running At Port ${PORT}`));
