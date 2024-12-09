let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');

canvas.height = 639;
canvas.width = 477;

const sprites = new Image();
const message = new Image();
const ground = new Image();
const bird_up = new Image();
const bird_down = new Image();
const bird_mid = new Image();
const pipe_top = new Image();
const pipe_bottom = new Image();
const gameover = new Image();
const playagain = new Image();
const scoreboard = new Image();

sprites.src = './assets/img/background-night.png';
message.src = './assets/img/message.png';
ground.src = './assets/img/base.png';
bird_up.src = '/assets/img/yellowbird-upflap.png'
bird_down.src = '/assets/img/yellowbird-downflap.png'
bird_mid.src = '/assets/img/yellowbird-midflap.png'
pipe_top.src = './assets/img/pipe-green-top.png';
pipe_bottom.src = './assets/img/pipe-green.png';
gameover.src = './assets/img/gameover.png';
playagain.src = './assets/img/spri.png';
scoreboard.src = './assets/img/spri.png';

const score = [];
for (let i = 0; i <= 9; i++) {
    const sco = new Image();
    sco.src = './assets/img/' + i + '.png';
    score.push(sco);
}

const arrNumber = [
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

const end = {
    draw: function() {
        ctx.beginPath();
        ctx.drawImage(gameover, 0, 0, 192, 42, canvas.width / 2 - 96, 150, 192, 42);
        ctx.drawImage(scoreboard, 3, 259, 113, 57, canvas.width / 2 - 113, 230, 226, 114);
        ctx.drawImage(playagain, 354, 118, 52, 29, canvas.width / 2 - 52, 380, 104, 58);
    }
}

// Ground
class Ground {
    constructor(cX, cY) {
       // vị trí của nền đất
        this.sX = 0;
        this.sY = 0;
        this.sW = 336;
        this.sH = 112;

        // Vị trí sẽ hiển thị trên canvas
        this.cX = cX;
        this.cY = cY;
        this.cW = 477;
        this.cH = 76.5;

        this.dX= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.drawImage(ground, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
    }
}
let arrGround = [];
for (let i = 0; i < 2; i++) {
    let gr = new Ground(477 * i, 562.5);
    arrGround.push(gr);
}

function drawArrGround() {
    arrGround.forEach(gr => gr.draw())
}

function uppdateArrGround() {
    arrGround.forEach(gr => {gr.cX += gr.dX});
    if (arrGround[0].cX + arrGround[0].cW <= 0) {
        arrGround.splice(0, 1);
        let gr = new Ground(arrGround[0].cX + 477, 562.5);
        arrGround.push(gr);
        console.log(arrGround.length);
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

// Bird Start
class Bird {
    constructor (cX, cY) {
        this.sX = 0;
        this.sY = 0;
        this.sW = 34;
        this.sH = 24;
        this.cX = cX;
        this.cY = cY;
        this.cW = 34;
        this.cH = 24;
        this.i = 0;
        this.v = 0;
        this.a = 0.048;
    }

    birdfly = [
        bird_up,
        bird_mid,
        bird_down
    ]

    draw() {
        if (game == 'start') {
            if (frame % 35 == 0) {
                this.i++;
                if (this.i > 2) {
                    this.i = 0;
                }
            }
        }

        if (game == 'play') {
            if (frame % 16 == 0) {
                this.i++;
                if (this.i > 2) {
                    this.i = 0;
                }
            }
        }

        ctx.drawImage(this.birdfly[this.i], this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
    }

    update() {
        if (game == 'play' || game == 'end') {
            this.v += this.a;
            this.cY += this.v;

            // Va cham voi nen dat
            if (this.cY + this.v + this.cH >= 562.5) {
                game = 'end';
                this.v = 0;
                this.cY = 538.5;
            }

            // Va cham voi duong ong
            if (bird.cX + bird.cW > arrPipes[0].cX + 5 && bird.cX < arrPipes[0].cX + arrPipes[0].cW
                && (bird.cY < arrPipes[0].cY + arrPipes[0].cH ||
                    bird.cY + bird.cH > arrPipes[0].cY + arrPipes[0].cH + arrPipes[0].space
                )
            ) {
                game = 'end';
            }

            // An diem
            if (bird.cX == arrPipes[0].cX + 52) {
                sco.value ++;
            }
        }
    }


}

let bird = new Bird(150, canvas.height / 2 + 30);

// Random
function random (min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

class Pipes {
    constructor (cX, cY, space) {
        this.sW = 52;
        this.sH = 320;
        this.cX = cX;
        this.cY = cY;
        this.cW = 52;
        this.cH = 320;
        this.sXt = 0;
        this.sYt = 0;
        this.sXb = 0;
        this.sYb = 0;
        this.space = space;
        this.dX = -1;
    }

    draw() {
        ctx.beginPath();
        ctx.drawImage(pipe_top, this.sXt, this.sYt, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
        ctx.drawImage(pipe_bottom, this.sXt, this.sYt, this.sW, this.sH, this.cX,
            this.cY + this.cH + this.space, this.cW, this.cH);
    }
}

let arrPipes = [];

function newPipe() {
    for (let i = 1; i < 4; i++) {
        let pipe = new Pipes(random(480, 600) * i, random(-250, -15.5), 200);
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
        let pipe = new Pipes(arrPipes[arrPipes.length - 1].cX + random(480, 600), random(-250, -15.5), random(150, 200));
        arrPipes.push(pipe);
        console.log(arrPipes.length);
    }
}

class Score {
    constructor (value) {
        this.value = value;
    }

    draw() {
        ctx.beginPath();
        if (this.value >= 10) {
            this.split = (this.value.toString()).split('');
            arrNumber.forEach(number => {
                if (this.split[0] == number.name) {
                    ctx.drawImage(number.img, 0, 0, 24, 36, canvas.width / 2 - 12, 80, 24, 36);
                }
                if (this.split[1] == number.name) {
                    ctx.drawImage(number.img, 0, 0, 24, 36, canvas.width / 2 + 12, 80, 24, 36);
                }
            });
        }
        else {
            this.split = this.value.toString();
            arrNumber.forEach(number => {
                if (this.split[0] == number.name) {
                    ctx.drawImage(number.img, 0, 0, 24, 36, canvas.width / 2 - 12, 80, 24, 36);
                }
            });
        }
    }
}

let sco = new Score(0);

canvas.addEventListener('click', function(event) {
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
            if (event.offsetX > canvas.width / 2 - 52 &&
                event.offsetX < canvas.width / 2 + 52 &&
                event.offsetY > 380 &&
                event.offsetY < 380 + 58
            ) {
                sco.value = 0;
                arrPipes = [];
                newPipe();
                bird.v = 0;
                bird.cY = canvas.height / 2 - 12;
                game = 'start';
            }
            break;
    }
});

function draw() {
    bg.draw();
    if (game == 'start') {
        start.draw();
    }
    drawArrPipes();
    drawArrGround();
    if (game == 'play') {
        sco.draw();
    }
    bird.draw();
    if (game == 'end') {
        end.draw();
    }
}

function update() {
    if (game == 'play') {
        uppdateArrPipes();
        uppdateArrGround();
    }
    bird.update();
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    frame++;
    draw();
    update();
}

animate();