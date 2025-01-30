function Ball(x,y,radius,dx,dy,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = -dy;

    this.color = color;

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    };
}

function DrawBall(ball) {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        ball.draw(ctx); // Call the draw method
    }
}

export { Ball, DrawBall };