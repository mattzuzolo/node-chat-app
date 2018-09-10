const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const PORT = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

//add middleware to express
app.use(express.static(publicPath));

//register event listener
//listen for connection and do something in CB
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.emit("newMessage", {
    from: "Marc",
    text: "marcs message",
    createdAt: 123123,
  });

  socket.on("createMessage", (message) => {
    console.log("createMessage", message)
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected")
  })
});

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
