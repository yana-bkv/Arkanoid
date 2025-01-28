function Ball(height,width,x,y,color) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.color = color;

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    };
}

const ball = new Ball(0, 5, 350, 412, 'black');

function DrawBall() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        ball.draw(ctx); // Call the draw method
    }
}


// Function to clear the canvas and redraw the puddle
function clearCanvasAndRedraw() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas

    ball.draw(ctx);  // Redraw puddle at the new position
}

// Add event listener to handle keypresses and move the puddle
document.addEventListener('keydown', function(event) {
    const canvas = document.getElementById("canvas");

     // Arrow key movement logic
    if (event.code === "Space") {
        console.log("space");
        ball.y = Math.max(0, ball.y - 15);  // Move left, don't go off-screen
    }

    clearCanvasAndRedraw();  
});

export { DrawBall };