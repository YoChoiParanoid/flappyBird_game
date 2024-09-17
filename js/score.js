export class Score {
    constructor (image, ctx, canvas) {
        this.image = image;
        this.ctx = ctx;
        this.canvas = canvas;
    }

    draw(value) {
        this.ctx.beginPath();
        if (this.value >= 10) {
            this.split = (value.toString()).split('');
            this.image.forEach(number => {
                if (this.split[0] == number.name) {
                    this.ctx.drawImage(number.img, 0, 0, 24, 36, this.canvas.width / 2 - 12, 80, 24, 36);
                }
                if (this.split[1] == number.name) {
                    this.ctx.drawImage(number.img, 0, 0, 24, 36, this.canvas.width / 2 + 12, 80, 24, 36);
                }
            });
        }
        else {
            this.split = value.toString();
            this.image.forEach(number => {
                if (this.split[0] == number.name) {
                    this.ctx.drawImage(number.img, 0, 0, 24, 36, this.canvas.width / 2 - 12, 80, 24, 36);
                }
            });
        }
    }
}