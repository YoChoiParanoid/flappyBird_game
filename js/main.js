import { Ground } from "./ground.js";
import { Bird } from "./bird.js";
import { Pipes } from "./pipe.js";

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
const bird_up = new Image();
bird_up.src = '/assets/img/yellowbird-upflap.png'
const bird_down = new Image();
bird_down.src = '/assets/img/yellowbird-downflap.png'
const bird_mid = new Image();
bird_mid.src = '/assets/img/yellowbird-midflap.png'
const pipe_top = new Image();
pipe_top.src = './assets/img/pipe-green-top.png';
const pipe_bottom = new Image();
pipe_bottom.src = './assets/img/pipe-green.png';

let game = 'start';
let frame = 0;

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
    // background position
    sX: 0,
    sY: 70,
    sW: 288,
    sH: 339.6226415,

    // canvas view position
    cX: 0,
    cY: 0,
    cW: 477,
    cH: 562.5,

    draw: function() {
        ctx.beginPath();
        ctx.drawImage(sprites, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
    }
}

// Bird
const birdfly = [
    bird_up,
    bird_mid,
    bird_down
]
let bird = new Bird(150, canvas.height / 2 + 30, birdfly, ctx);

// Add Ground
let arrGround = [];
for (let i = 0; i < 2; i++) {
    let gr = new Ground(477 * i, 562.5, ground, ctx);
    arrGround.push(gr);
}

function drawArrGround() {
    arrGround.forEach(gr => gr.draw())
}

function uppdateArrGround() {
    arrGround.forEach(gr => {gr.cX += gr.dX});
    if (arrGround[0].cX + arrGround[0].cW <= 0) {
        arrGround.splice(0, 1);
        let gr = new Ground(arrGround[0].cX + 477, 562.5, ground, ctx);
        arrGround.push(gr);
        console.log(arrGround.length);
    }
}

// Add Pipes
const pipe_image = [
    pipe_top,
    pipe_bottom
]

let arrPipes = [];

function random (min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

function newPipe() {
    for (let i = 1; i < 4; i++) {
        let pipe = new Pipes(random(480, 600) * i, random(-250, -15.5), 200, pipe_image, ctx);
        arrPipes.push(pipe);
    }
}

newPipe();

function drawArrPipes() {
    arrPipes.forEach(pipe => pipe.draw());
}

function uppdateArrPipes() {
    arrPipes.forEach(pipe => {pipe.cX += pipe.dX});

    if (arrPipes[0].cX + arrPipes[0].cW <= 0) {
        arrPipes.splice(0, 1);
        let pipe = new Pipes(arrPipes[arrPipes.length - 1].cX + random(480, 600), random(-250, -15.5), random(150, 200), pipe_image, ctx);
        arrPipes.push(pipe);
        console.log(arrPipes.length);
    }
}

// Click Event
canvas.addEventListener('click', function() {
    switch (game) {
        case 'start':
            game = 'play';
            break;
        case 'play':
            console.log('playgame');
            break;
        case 'end':
            console.log('endgame');
            break;
    }
});

// Main flow
function draw() {
    bg.draw();
    if (game == 'start') {
        start.draw();
    }
    drawArrPipes();
    drawArrGround();
    bird.draw(frame, game);
}

function update() {
    if (game == 'play') {
        uppdateArrPipes();
        uppdateArrGround();
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    frame++;
    if (frame == 320)
        frame = 0;
    draw();
    update();
}

animate();