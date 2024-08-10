//  File Name: script.js
//  Author: Artem Suprun
//  Date: 06/14/2022
//  Summary: A JS script file for the rain folder, which runs a
//  program on the javascript canvas.
//

const canvas = document.getElementById("cvs");
const ctx = canvas.getContext("2d");
ctx.globalAlpha = 0.4; // for trail effect of rain

const d = []; // array for Drops

// returns a random int between the min and max
function getRndInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Drop class
class Drop {
  constructor(x, dir) {
    this.x = x;
    this.y = -10;
    this.dir = dir;
    this.size = 3;
  }
  update() {
    this.y += 4;
    this.x += this.dir;
  }
}

// Draws the position of the Drop
function drawDrop(d) {
  ctx.beginPath();
  ctx.arc(d.x, d.y, d.size, 0, Math.PI*2);
  ctx.fillStyle = "dodgerblue";
  ctx.fill()
  ctx.closePath();
}

// dipslays the canvas in motion
function draw() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // random chance to spawn a drop per frame.
  if (getRndInt(1, 2) === 1) {
    let x = getRndInt(0, canvas.width);
    let dir = Math.random() < 0.5 ? -.2 : .2;
    d[d.length] = new Drop(x, dir);
  }
  
  // draws drop and removes it when its outbound
  for (let i = (d.length-1); i >= 0; i--) {
    d[i].update();
    drawDrop(d[i]);
    if (d[i].y > canvas.height+10) {
      d.splice(i, 1);
    }
  }
}

var interval = setInterval(draw, 10);
