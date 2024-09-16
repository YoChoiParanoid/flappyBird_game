import { Ground } from "./ground.js";

// Set canvas
let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');

canvas.height = 639;
canvas.width = 477;

// Variable
const sprites = new Image();
sprites.src = './assets/img/background-night.png';
const message = new Image();
message.src = './assets/img/message.png';
const ground = new Image();
ground.src = './assets/img/base.png';

// Screen
const start = {
    draw: function() {
        ctx.beginPath();
        ctx.drawImage(message, 0, 0, 184, 48, canvas.width / 2 - 92, 50, 184, 48);
        ctx.drawImage(message, 0, 100, 184, 53, canvas.width / 2 - 92, 200, 184, 53);
        ctx.drawImage(message, 0, 168, 184, 99, canvas.width / 2 - 92, 350, 184, 99);
    }
}

// Background
const bg = {
    // vị trí của bg
    sX: 0,
    sY: 70,
    sW: 288,
    sH: 339.6226415,

    // Vị trí sẽ hiển thị trên canvas
    cX: 0,
    cY: 0,
    cW: 477,
    cH: 562.5,

    draw: function() {
        ctx.beginPath();
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
    }
}

// Add Ground
let arrGround = [];
for (let i = 0; i < 2; i++) {
    let gr = new Ground(477 * i, 562.5, ground, ctx);
    arrGround.push(gr);
}

function drawArrGround() {
    arrGround.forEach(gr => gr.draw())
}



// Main flow
function draw() {
    bg.draw();
    start.draw();
    drawArrGround();
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    draw();
}

animate();