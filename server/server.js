const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");
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

  socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));


  socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));

  socket.on("createMessage", (message, callback) => {
    console.log("createMessage", message)
    io.emit("newMessage", generateMessage(message.from, message.text));

    //server-side acknowledgment. Passed as arg
    //use object for multiple items in cb
    callback();
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
  })

  socket.on("disconnect", () => {
    console.log("User was disconnected")
  })
});

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
