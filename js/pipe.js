export class Pipes {
    constructor (cX, cY, space, image, ctx) {
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
        this.image = image;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.image[0], this.sXt, this.sYt, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
        this.ctx.drawImage(this.image[1], this.sXt, this.sYt, this.sW, this.sH, this.cX,
            this.cY + this.cH + this.space, this.cW, this.cH);
    }
}