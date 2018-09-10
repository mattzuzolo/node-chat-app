let socket = io(); //initiates a request from the client to the sever and keeping that connection open
//critical for communicating with server

socket.on("connect", () => {
  console.log("Connected to server");

});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newMessage", (message) => {
  console.log("newMessage", message);
  let individualFeedMessage = document.createElement("li");
  individualFeedMessage.innerText = `${message.from}: ${message.text}`
  document.getElementById("message-feed").append(individualFeedMessage);
});

document.getElementById("message-form").addEventListener("submit", (event) => {
  event.preventDefault();

  socket.emit("createMessage", {
    from: "User",
    text: document.getElementById("message-field").value,
  }, () => {
    console.log("front end acknoledgment")
  })
});
