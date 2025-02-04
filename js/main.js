import { Field } from './game.js';
import { Ball,  DrawBall } from './ball.js';
import { Puddle, DrawPuddle } from './puddle.js';
import { DrawBricks, createBricks } from './bricks.js'

let gameOver = false; 
let playerScore = 0;
let brokenBricksCounter = 0;
// Initialize all objects
const ball = new Ball(350, 412, 5, 1, -1, 'black');
const puddle = new Puddle(330, 420, 40, 10, "white");
const bricks = createBricks(13, 9, 40, 15, 10, 30, 30, "#611717");
// const brick = new Brick(30, 30, 40, 15, "#611717", true, 13, 9, 10, 30, 30);

function draw() {
    Field();
    DrawBall(ball);
    DrawPuddle(puddle);
    DrawBricks(bricks);
    collisionDetection(ball, bricks);

    console.log(`Your score is ${playerScore} you have broken ${brokenBricksCounter} bricks.`);
}

function collisionDetection(ball, bricks) {
    bricks.forEach(brick => {
        if (brick.visible) {
            // Check if the ball collides with the brick
            if (
                ball.x + ball.radius > brick.x && // Ball's right edge > brick's left edge
                ball.x - ball.radius < brick.x + brick.width && // Ball's left edge < brick's right edge
                ball.y + ball.radius > brick.y && // Ball's bottom edge > brick's top edge
                ball.y - ball.radius < brick.y + brick.height // Ball's top edge < brick's bottom edge
            ) {
                // Collision detected
                playerScore += 200;
                brokenBricksCounter += 1;
                brick.visible = false; // Hide the brick
                ball.dy = -ball.dy; // Reverse the ball's vertical direction
            }
        }
    });
}

// KEY HANDLERS
// Add event listener to handle keypresses and move the puddle
document.addEventListener('keydown', function(event) {
    // Arrow key movement logic
   if (event.code === "Space") {
       setInterval(() => moveCircle(ball), 1);
   }
   
   clearCanvasAndRedraw(ball);  
});

// Add event listener to handle keypresses and move the puddle
document.addEventListener('keydown', function(event) {
    const canvas = document.getElementById("canvas");

    // Arrow key movement logic
    if (event.key === "ArrowLeft") {
        puddle.x = Math.max(0, puddle.x - 17);  // Move left, don't go off-screen
    }
    if (event.key === "ArrowRight") {
        puddle.x = Math.min(canvas.width - puddle.width, puddle.x + 17);   // Move right, don't go off-screen
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
    if (ball.x + ball.dx > canvas.width-ball.radius || ball.x + ball.dx < ball.radius) { // Left andt right walls
        ball.dx = -ball.dx;
    }   
    if ( ball.y + ball.dy < ball.radius) { // Top wall
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > puddle.y - ball.radius) { // Bottom 
            if (ball.x + ball.radius > puddle.x && ball.x - ball.radius < puddle.x + puddle.width) {
                if (ball.y = ball.y - puddle.height) {
                    ball.dy = -ball.dy;
                    //console.log("Touched puddle");
                }
            } else if (ball.y + ball.dy > canvas.height-ball.radius) {
                gameOver = true; // Set flag to prevent multiple reloads
                alert("Game Over");
                setTimeout(() => document.location.reload(), 1000); // Reload after 1 sec
            }
    }
 
    ball.x += ball.dx/2;
    ball.y += ball.dy/2;   
}

function loop() {
    draw();
    window.requestAnimationFrame(loop);
}

loop();



// сделано движение доски, нарисован весь канвас,
// механика мяча - отскакивает от стен и доски, при пролетании мимо доски игра окончен
// надо сделать механику ломания блоков 
// пофиксить баг где мяч отскакивает пролетая рядом с доской
// добавить ХП и Счет игрока
// возможность поставить на паузу и начать сначала

// C и R надо инициализовать в этом файле
// все переменные кирпича запихнуть в объект, добавить уровень сложности