import { Puddle } from './puddle.js';

function Ball(radius,x,y,color) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.color = color;

    this.dx = 2;
    this.dy = -2;

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    };
}

let gameOver = false; 
const ball = new Ball(5, 350, 412, 'black');

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
        setInterval(moveCircle,1); 
    }

    clearCanvasAndRedraw();  
});

function moveCircle() {
    if (gameOver) return; 
    if (ball.x + ball.dx > canvas.width-ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }   
    if ( ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        if (ball.x > Puddle.pX && ball.x < Puddle.pX + Puddle.pWidth) {
            ball.dy = -ball.dy;
            console.log("Touched puddle");
        } else {
            gameOver = true; // Set flag to prevent multiple reloads
            alert("Game Over");
            setTimeout(() => document.location.reload(), 1000); // Reload after 1 sec
            return;
        }
    }
 
    ball.x += ball.dx;
    ball.y += ball.dy;
}

export { DrawBall };