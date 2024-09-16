import { Ground } from "./ground.js";
import { Bird } from "./bird.js";

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

// Click Event
canvas.addEventListener('click', function(event) {
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
    drawArrGround();
    bird.draw(frame, game);
}

function update() {
    if (game == 'play') {
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