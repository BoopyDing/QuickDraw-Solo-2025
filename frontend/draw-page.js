console.log("JS loaded");
let canvas = document.getElementById("myCanvas");
let slider = document.getElementById("myRange");
let ctx = canvas.getContext("2d");
let isDrawing = false;

ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;

let lastX;
let LastY;

let writingSize;

let writingColor = "black";

ctx.strokeStyle = writingColor;
ctx.lineWidth = 2;
ctx.lineCap = "round";

function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function pencil() {
  writingColor = "black";
}

function eraser() {
  writingColor = "white";
}

canvas.addEventListener("mousedown", function (event) {
  lastX = event.offsetX;
  lastY = event.offsetY;
  isDrawing = true;
  redoArray = [];
  undoArray = [];
});
canvas.addEventListener("mouseup", function (event) {
  isDrawing = false;
});
canvas.addEventListener("mousemove", function (event) {
  if (isDrawing) {
    let x = Math.round(event.offsetX);
    let y = Math.round(event.offsetY);

    ctx.strokeStyle = writingColor;
    ctx.lineWidth = writingSize;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
  }
});

slider.addEventListener("input", function () {
  writingSize = slider.value;
});
