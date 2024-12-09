// Ground
export class Ground {
    constructor(cX, cY, image, ctx) {
        this.image = image;
        this.ctx = ctx;

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
        this.ctx.beginPath();
        this.ctx.drawImage(this.image, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
        console.log(this.birdfly[this.i]);
    }
}