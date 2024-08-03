const redToWhiteButton = document.getElementById("redToWhite");
const greenToWhiteButton = document.getElementById("greenToWhite");
// const rememberMe = document.getElementById("remeberMe");
// const freeText = document.getElementById("freeText");

// redToWhiteButton.style.backgroundColor = "white";
// greenToWhiteButton.style.backgroundColor = "white";

var socket = io();

redToWhiteButton.onclick = () => {
  redToWhiteButton.style.backgroundColor =
    redToWhiteButton.style.backgroundColor === "white" ? "red" : "white";
  socket.emit("red-to-white", redToWhiteButton.style.backgroundColor);
};

socket.on("red-to-white", (color) => {
  redToWhiteButton.style.backgroundColor = color;
});

greenToWhiteButton.onclick = () => {
  greenToWhiteButton.style.backgroundColor =
    greenToWhiteButton.style.backgroundColor === "white" ? "green" : "white";
  socket.emit("green-to-white", greenToWhiteButton.style.backgroundColor);
};

socket.on("green-to-white", (color) => {
  greenToWhiteButton.style.backgroundColor = color;
});
