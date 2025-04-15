console.log("JS loaded");
let canvas = document.getElementById("myCanvas");
let slider = document.getElementById("myRange");
let prediction = document.getElementById("prediction");
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
  prediction.textContent = "";
}

function pencil() {
  writingColor = "black";
}

function eraser() {
  writingColor = "white";
}

async function getPrediction() {
  const canvas = document.getElementById("myCanvas");
  const imageData = canvas.toDataURL("image/png"); // returns base64 string

  const res = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: imageData }),
  });

  const data = await res.json();
  return data.prediction;
}

async function printPrediction() {
  const predict = await getPrediction();
  let text;
  switch (predict) {
    case 0:
      text = "T-Shirt";
      break;
    case 1:
      text = "Pant";
      break;
    case 2:
      text = "Pullover";
      break;
    case 3:
      text = "Dress";
      break;
    case 4:
      text = "Coat";
      break;
    case 5:
      text = "Sandal";
      break;
    case 6:
      text = "Shirt";
      break;
    case 7:
      text = "Sneaker";
      break;
    case 8:
      text = "Bag";
      break;
    case 9:
      text = "Ankle Boot";
      break;
    default:
      console.log("Unknown prediction");
  }

  prediction.textContent = text;
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
