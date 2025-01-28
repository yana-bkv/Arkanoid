function Ball(bHeight,bWidth,bX,bY,bColor) {
    this.bHeight = bHeight;
    this.bWidth = bWidth;
    this.bX = bX;
    this.bY = bY;
    this.bColor = bColor;

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.bX, this.bY, this.bWidth, 0, Math.PI * 2, true);
        ctx.fillStyle = this.bColor;
        ctx.fill();
        ctx.stroke();
    };
}

function DrawBall() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        const ball = new Ball(0, 5, 350, 412, 'black');
        ball.draw(ctx); // Call the draw method
    }
}


export { DrawBall };