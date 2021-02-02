const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, (error) => {
    if (error) {
      return console.log(error)
    }

    console.log("MSG delivered!")
  });
});

document.querySelector("#send-location").addEventListener("click", () => {
  !navigator.geolocation
    ? alert("Geolocation in not supported by your browser")
    : navigator.geolocation.getCurrentPosition((position) => {
      socket.emit("sendLocation", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }, (message) => {
          console.log("Coords send by client!", message);
      });
  });
})