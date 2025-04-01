console.log("JS loaded");
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let isDrawing = false;

ctx.fillStyle = "black";

canvas.addEventListener("mousedown", function (event) {
  console.log("mouse down");
  isDrawing = true;
});
canvas.addEventListener("mouseup", function (event) {
  console.log("mouse up");
  isDrawing = false;
});
canvas.addEventListener("mousemove", function (event) {
  if (isDrawing) {
    let x = event.offsetX;
    let y = event.offsetY;
    console.log("drawing");
    ctx.fillRect(x, y, 1, 1);
  }
});
