export class Bird {
    constructor (cX, cY, birdfly, ctx) {
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
        this.birdfly = birdfly;
        this.ctx = ctx;
    }

    draw(frame, game) {
        if (game == 'start') {
            if (frame % 32 == 0) {
                console.log(frame);
                this.i++;
                if (this.i > 2) {
                    this.i = 0;
                }
            }
            console.log(frame);
            console.log(game);
        }
        
        if (game == 'play') {
            if (frame % 16 == 0) {
                console.log(frame);
                this.i++;
                if (this.i > 2) {
                    this.i = 0;
                }
            }
        }
        console.log(this.birdfly[this.i]);
        this.ctx.drawImage(this.birdfly[this.i], this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
    }

    update(game) {
        if (game == 'play') {
            this.v += this.a;
            this.cY += this.v;
        }
    }
}