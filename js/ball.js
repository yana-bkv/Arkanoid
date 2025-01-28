function Ball(bHeight,bWidth,bX,bY,bColor) {
    this.bHeight = bHeight;
    this.bWidth = bWidth;
    this.bX = bX;
    this.bY = bY;
    this.bColor = bColor;
}

var ball = new Ball(0,5,350,400,"black");

function DrawBall() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.arc(ball.bX, ball.bY, ball.bWidth, ball.bHeight, Math.PI * 2, true);
        ctx.fillStyle = ball.bColor;  // Fill with the color of the ball
        ctx.fill();
        ctx.stroke();
    }
}


export { DrawBall };