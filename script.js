var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var height = canvas.height,
  width = canvas.width,
  centerX = width / 2,
  centerY = height / 2;
var pi = 3.1415;

var numLines = 350;
var r1 = 200;
var r2 = 40;

function drawLines(value) {
  for (var i = 0; i < numLines; i++) {
    var x1 = centerX + value * Math.cos((2 * pi * i) / numLines);
    var y1 = centerY + value * Math.sin((2 * pi * i) / numLines);
    var x2 = centerX + value * Math.cos((value * pi * i) / numLines);
    var y2 = centerY + value * Math.sin((value * pi * i) / numLines);
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

var controls = document.getElementById("controls");
var input = document.getElementById("input");
var slider = document.getElementById("radius");
var startButton = document.getElementById("startButton");
var endButton = document.getElementById("endButton");
var immersive = document.getElementById("immersive");

immersive.onclick = () => {
  canvas.requestFullscreen();
};

document.addEventListener("fullscreenchange", evt => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = canvas.width;
  height = canvas.height;
  centerX = width / 2;
  centerY = height / 2;
  if (document.fullscreenElement) {
    document.body.style.cursor = "none";
  } else {
    document.body.style.cursor = "default";
  }
});

input.value = slider.value;

const onSliderInput = evt => {
  input.value = evt.target.value;
  change(evt.target.value);
};

const onInputChange = evt => {
  slider.value = Number(evt.target.value);
  change(Number(evt.target.value));
};

var animateValue = 300;

const down = () => {
  animateValue -= 0.01;
};
const up = () => {
  animateValue += 0.01;
};
var upOrDown = up;

const change = value => {
  ctx.beginPath();
  ctx.clearRect(0, 0, width, height);
  if (typeof value === "undefined") {
    if (animateValue >= (width > height ? height : width)) {
      upOrDown = down;
    } else if (animateValue <= 0) {
      upOrDown = up;
    }
    upOrDown();
    drawLines(animateValue);
    slider.value = animateValue;
    input.value = animateValue;
  } else {
    drawLines(value);
    animateValue = Number(value);
  }
};

var animationInterval;

slider.oninput = onSliderInput;
input.onchange = onInputChange;
startButton.onclick = () => {
  if (!animationInterval) {
    animationInterval = setInterval(change, 16); // 60 frames per second
  }
};
endButton.onclick = () => {
  clearInterval(animationInterval);
  animationInterval = null;
};
