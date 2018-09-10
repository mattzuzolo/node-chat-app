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
  let li = document.createElement("li");
  li.innerText = `${message.from}: ${message.text}`
  document.getElementById("message-feed").append(li);
});

socket.on("newLocationMessage", (message) => {
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.href = message.url;
  a.innerText = `${message.from}: Click for my location`
  li.append(a);
  document.getElementById("message-feed").append(li);
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

let locationButton = document.getElementById("send-location-button");

locationButton.addEventListener("click", (event) => {
  if(!navigator.geolocation){
    return alert("Geolocation not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("createLocationMessage", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }, () => {
    alert("Unable to fetch location")
  })

});
