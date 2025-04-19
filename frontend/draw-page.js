console.log("JS loaded");
let canvas = document.getElementById("myCanvas");
let slider = document.getElementById("myRange");
let prediction = document.getElementById("prediction");
let prompt = document.getElementById("prompt");
let time = document.getElementById("time");
let retryButton = document.getElementById("retryButton");

let ctx = canvas.getContext("2d");
let isDrawing = false;

let timeLeft = 10;
let timerInterval;
let timerStarted = false;

function startTimer() {
  retryButton.disabled = true;
  time.textContent = "Time Left: " + timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    time.textContent = "Time Left: " + timeLeft;

    if (timeLeft <= 0) {
      retryButton.disabled = false;
      time.textContent = "Time Left: " + timeLeft;
      clearInterval(timerInterval);
    }
  }, 1000);
}

function getRandomPrompt() {
  let num = Math.floor(Math.random() * 10);
  switch (num) {
    case 0:
      text = "T-Shirt";
      break;
    case 1:
      text = "Pants";
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
  }
  prompt.textContent = "Prompt: " + text;
}

startTimer();
getRandomPrompt();

function retry() {
  timeLeft = 10;
  startTimer();
  resetCanvas();
  getRandomPrompt();
}

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
  prediction.textContent = "Prediction:";
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

  prediction.textContent = "Prediction: " + text;
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
  if (isDrawing && timeLeft > 0) {
    console.log(timeLeft);
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
