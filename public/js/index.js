let socket = io(); //initiates a request from the client to the sever and keeping that connection open
//critical for communicating with server

socket.on("connect", () => {
  console.log("Connected to server");

  socket.emit("createMessage", {
    from: "Matt",
    text: "matt's message",
  })
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newMessage", (message) => {
  console.log("newMessage", message);
});
