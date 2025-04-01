console.log("JS loaded");
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let isDrawing = false;

let lastX;
let LastY;

ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.lineCap = "round";

canvas.addEventListener("mousedown", function (event) {
  console.log("mouse down");
  lastX = event.offsetX;
  lastY = event.offsetY;
  isDrawing = true;
});
canvas.addEventListener("mouseup", function (event) {
  console.log("mouse up");
  isDrawing = false;
});
canvas.addEventListener("mousemove", function (event) {
  if (isDrawing) {
    console.log("drawing");
    let x = event.offsetX;
    let y = event.offsetY;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
  }
});
