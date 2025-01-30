import { Field } from './game.js';
import { Ball,  DrawBall } from './ball.js';
import { Puddle, DrawPuddle } from './puddle.js';
import { DrawBricks } from './bricks.js'

let gameOver = false; 
const ball = new Ball(350, 412, 5, 1, -1, 'black');
const puddle = new Puddle(330, 420, 40, 10, "white");
 
function draw() {
    Field();
    DrawBall(ball);
    DrawPuddle(puddle);
    DrawBricks();
}

// KEY HANDLERS
// Add event listener to handle keypresses and move the puddle
document.addEventListener('keydown', function(event) {
    // Arrow key movement logic
   if (event.code === "Space") {
       console.log("space");
       setInterval(() => moveCircle(ball), 1);
   }

   clearCanvasAndRedraw(ball);  
});

// Add event listener to handle keypresses and move the puddle
document.addEventListener('keydown', function(event) {
    const canvas = document.getElementById("canvas");

    // Arrow key movement logic
    if (event.key === "ArrowLeft") {
        console.log("Left arrow pressed");
        puddle.x = Math.max(0, puddle.x - 15);  // Move left, don't go off-screen
    }
    if (event.key === "ArrowRight") {
        console.log("Right arrow pressed");
        puddle.x = Math.min(canvas.width - puddle.width, puddle.x + 15);   // Move right, don't go off-screen
    }

    clearCanvasAndRedraw(puddle);  
});



// Function to clear the canvas and redraw the puddle
function clearCanvasAndRedraw(element) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas

    element.draw(ctx);  // Redraw puddle at the new position
}

// Мяч ударяется о стенки и об доску
function moveCircle() {
    if (gameOver) return; 
    if (ball.x + ball.dx > canvas.width-ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }   
    if ( ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > puddle.y - ball.radius) {
            if (ball.x + ball.radius > puddle.x && ball.x - ball.radius < puddle.x + puddle.width) {
                if (ball.y = ball.y - puddle.height) {
                    ball.dy = -ball.dy;
                    console.log("Touched puddle");
                }
            } else if (ball.y + ball.dy > canvas.height-ball.radius) {
                gameOver = true; // Set flag to prevent multiple reloads
                alert("Game Over");
                setTimeout(() => document.location.reload(), 1000); // Reload after 1 sec
            }
    }
 
    ball.x += ball.dx;
    ball.y += ball.dy;
    
}

function loop() {
    draw();
    window.requestAnimationFrame(loop);
}

loop();



// сделано движение доски, нарисован весь канвас
// надо сделать механику соприкосновения с объектами, отскакивание от стен и ломание блоков
// добавить ХП и Счет игрока
// возможность поставить на паузу и начать сначала