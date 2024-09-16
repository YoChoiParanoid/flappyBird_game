export const start = {
    draw: function(ctx, image, canvas) {
        ctx.beginPath();
        ctx.drawImage(image, 0, 0, 184, 48, canvas.width / 2 - 92, 50, 184, 48);
        ctx.drawImage(image, 0, 100, 184, 53, canvas.width / 2 - 92, 200, 184, 53);
        ctx.drawImage(image, 0, 168, 184, 99, canvas.width / 2 - 92, 350, 184, 99);
    }
}

