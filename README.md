# Speak-Chat-App
## Real-Time Chat Application

This is a simple real-time chat application using Node.js, Express, and Socket.io. It includes both server-side and client-side code.

## Server-side

### Technologies Used
- Node.js
- Express.js
- Socket.io
- CORS (Cross-Origin Resource Sharing)

### Getting Started

1. Clone this repository to your local machine.
2. Install the required Node.js packages:

3. Run the server:

```javascript
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
  console.log(`A user connected: ${socket.id}`);

  socket.on("send-message", (messages) => {
    console.log(messages);
    io.emit("group-message", messages);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server Running At Port ${PORT}`);
});
```

## Client-side

**Technologies Used**

- HTML
- JavaScript
- Socket.io client library



