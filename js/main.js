import { Ground } from "./ground.js";
import { Bird } from "./bird.js";
import { Pipes } from "./pipe.js";
import { start } from "./screen.js";
import { Score } from "./score.js";

// Set canvas
let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');

canvas.height = 639;
canvas.width = 477;

// Variable
const sprites = new Image();
sprites.src = '/YoChoiParanoid/assets/img/background-night.png';
const message = new Image();
message.src = '/YoChoiParanoid/assets/img/message.png';
const ground = new Image();
ground.src = '/YoChoiParanoid/assets/img/base.png';
const bird_up = new Image();
bird_up.src = '/YoChoiParanoid/assets/img/yellowbird-upflap.png'
const bird_down = new Image();
bird_down.src = '/YoChoiParanoid/assets/img/yellowbird-downflap.png'
const bird_mid = new Image();
bird_mid.src = '/YoChoiParanoid/assets/img/yellowbird-midflap.png'
const pipe_top = new Image();
pipe_top.src = '/YoChoiParanoid/assets/img/pipe-green-top.png';
const pipe_bottom = new Image();
pipe_bottom.src = '/YoChoiParanoid/assets/img/pipe-green.png';

let game = 'start';
let frame = 0;

const score = [];
for (let i = 0; i <= 9; i++) {
    const sco = new Image();
    sco.src = './assets/img/' + i + '.png';
    score.push(sco);
}

const image = [
    {name: 0, img: score[0]},
    {name: 1, img: score[1]},
    {name: 2, img: score[2]},
    {name: 3, img: score[3]},
    {name: 4, img: score[4]},
    {name: 5, img: score[5]},
    {name: 6, img: score[6]},
    {name: 7, img: score[7]},
    {name: 8, img: score[8]},
    {name: 9, img: score[9]}
]

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

// Handle Score
let sco = new Score(image, ctx, canvas);

// Click Event
canvas.addEventListener('click', function() {
    switch (game) {
        case 'start':
            game = 'play';
            break;
        case 'play':
            console.log('playgame');
            bird.v = -3;
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
        start.draw(ctx, message, canvas);
    }
    drawArrPipes();
    drawArrGround();
    if (game == 'play') {
        sco.draw(0);
    }
    bird.draw(frame, game);
}

function update() {
    if (game == 'play') {
        uppdateArrPipes();
        uppdateArrGround();
    }
    bird.update(game);
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