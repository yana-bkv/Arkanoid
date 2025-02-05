import { Board } from './game.js';
import { Ball,  DrawBall } from './ball.js';
import { Puddle, DrawPuddle } from './puddle.js';
import { DrawBricks, createBricks } from './bricks.js'

let isBallMoving = false;
let gameOver = false; 
let gameWin = false;
let HP = 3;
let playerScore = 0;
 
// x,y,radius,dx,dy,color
const ball = new Ball(350, 412, 6, 3, -3, 'white');
// x,y, width, height, color
const puddle = new Puddle(330, 420, 40, 10, "white");
// columns, rows, brickWidth, brickHeight, paddingBetween, offsetTop, offsetLeft, color
const bricks = createBricks(13, 4, 40, 15, 10, 30, 30);

function draw() {
    Board();
    DrawBall(ball);
    DrawPuddle(puddle);
    DrawBricks(bricks);

    moveCircle(ball);
    collisionDetection(ball, bricks);
    drawHUD(HP, playerScore);
}

// Add event listener to handle keypresses and move the puddle
document.addEventListener('keydown', function(event) {
    // Arrow key movement logic
   if (event.code === "Space") {
        if (!isBallMoving) {
            isBallMoving = true;
            ball.dx = 2;
            ball.dy = -3;
        }
       //setInterval(() => moveCircle(ball), 1);
   }
   
   clearCanvasAndRedraw(ball);  
});

// Add event listener to handle keypresses and move the puddle
// document.addEventListener('keydown', function(event) {
//     // Arrow key movement logic
//    if (event.code === "Escape") {
//     Board();
//     ball.dx = 0;
//     ball.dy = 0;
//    }
   
//    clearCanvasAndRedraw(ball);  
// });

// Мяч ударяется о стенки и об доску
function moveCircle(ball) {
    // if (playerScore == bricks.length) {
    //     alert(`You Won!`);
    //     setTimeout(() => document.location.reload()); // Reload after 1 sec
    //     gameWin = true;
    // }
    // if (gameOver && gameWin) return; 
    if (isBallMoving) {
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
                    if (HP == 1) {
                        alert(`Game Over. Your score is ${playerScore}`);
                        setTimeout(() => document.location.reload(), 1000); // Reload after 1 sec
                        gameOver = true;
                    }
                    HP = HP - 1;
                    resetBall(ball);
                }
        }
        
        ball.x += ball.dx;
        ball.y += ball.dy;  
    } else if (!isBallMoving) { 
        ball.x = puddle.x + 20; // таскать мяч за доской пока игра не началась
    }
    
}

function resetBall(ball) {
    ball.x = 350;
    ball.y = 412;
    ball.dx = 0;
    ball.dy = 0;
    isBallMoving = false;
}

function drawHUD(hp, score) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    // Save current context state
    
    // Set text styles
    ctx.fillStyle = 'white';
    ctx.font = "25px 'Jersey 15'";
    
    // Draw HP (left side)
    ctx.textAlign = 'left';
    ctx.fillText(`HP: ${hp}`, 20, canvas.height - 20);
    
    // Draw Score (right side)
    ctx.textAlign = 'right';
    ctx.fillText(`Score: ${score}`, canvas.width - 20, canvas.height - 20);
    
    // Restore context state
    ctx.restore();
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
                playerScore += 1;
                brick.visible = false; // Hide the brick
                ball.dy = -ball.dy; // Reverse the ball's vertical direction
            }
        }
    });
}


// Function to clear the canvas and redraw the puddle
function clearCanvasAndRedraw(element) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas

    element.draw(ctx);  // Redraw puddle at the new position
}

// KEY HANDLERS
// Add event listener to handle keypresses and move the puddle
document.addEventListener('keydown', function(event) {
    const canvas = document.getElementById("canvas");

    // Arrow key movement logic
    if (event.key === "ArrowLeft") {
        puddle.x = Math.max(0, puddle.x - 15);  // Move left, don't go off-screen
    }
    if (event.key === "ArrowRight") {
        puddle.x = Math.min(canvas.width - puddle.width, puddle.x + 15);   // Move right, don't go off-screen
    }

    clearCanvasAndRedraw(puddle);  
});

function loop() {
    draw();
    window.requestAnimationFrame(loop);
}

loop();