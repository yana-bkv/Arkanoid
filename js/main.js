import { Board, DrawHUD, ShowGameOver, ShowGameWin, StopGame } from './game.js';
import { Ball,  DrawBall } from './ball.js';
import { Puddle, DrawPuddle } from './puddle.js';
import { DrawBricks, createBricks } from './bricks.js'

// Stats
let isBallMoving = false;
let gameOver = false; 
let HP = 2;
let playerScore = 0;

let hasStarted = false;
let timerInterval; 
let startTime;
 
// x,y,radius,dx,dy,color
const ball = new Ball(350, 412, 6, 0, 0, 'white');
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
    DrawHUD(HP, playerScore,fps);
    if (!hasStarted) {
        startTime = Date.now();
        hasStarted = true;
        startTimer();
      }
}

function startTimer() {
    timerInterval = setInterval(() => { 
        const currentTime = Date.now();
        const elapsedMilliseconds = currentTime - startTime;
    
        // Convert milliseconds to minutes and seconds
        const totalSeconds = Math.floor(elapsedMilliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        console.log(minutes,seconds);
    },1000); 
}

function stopTimer() {
    clearInterval(timerInterval);
    hasStarted = false;
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

    if (event.code === "Space") {
        if (!isBallMoving) {
            isBallMoving = true;
            const index = Math.floor(Math.random() * 6); // 0-5
            const randomIntX = index < 3 ? index - 3 : index - 2;
            ball.dx = randomIntX;
            ball.dy = -3;
        }
   }

   if (event.code === "Escape") {
    let tempDx, tempDy;
    tempDx = ball.dx;
    tempDy = ball.dy;
    StopGame(ball,tempDx,tempDy);
    stopTimer();
   }
   
});

// Put ball to initial position
function resetBall(ball) {
    ball.x = 350;
    ball.y = 412;
    ball.dx = 0;
    ball.dy = 0;
    isBallMoving = false;
}

// Мяч ударяется о стенки и об доску
function moveCircle(ball) {
    if (playerScore == bricks.length) {
        ShowGameWin(ball);
    }
    if (gameOver) {
        ShowGameOver(ball);
    }
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

var times = [];
var fps;

function loop() {
  draw();
  window.requestAnimationFrame(function() {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    loop();
  });
}


loop();