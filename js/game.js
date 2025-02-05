const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let tempDx, tempDy;

function Board() {
    canvas.width = 700;
    canvas.height = 500;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width , canvas.height);
}

// Show players stats 
function DrawHUD(hp, score,fps) {
    // Set text styles
    ctx.fillStyle = 'white';
    ctx.font = "25px 'Jersey 15'";
    
    // Draw HP (left side)
    ctx.textAlign = 'left';
    ctx.fillText(`HP: ${hp}    Score: ${score}`, 20, canvas.height - 20);
    
    // Draw Score (right side)
    ctx.textAlign = 'right';
    ctx.fillText(`Fps: ${fps}`, canvas.width - 20, canvas.height - 20);
}

function ShowGameOver(ball) {
    ctx.fillStyle = 'white';
    ctx.font = "50px 'Jersey 15'";

    ctx.textAlign = 'center';
    ctx.fillText('Game Over ', canvas.width/2, canvas.height/2);

    ball.dx = 0;
    ball.dy = 0;
    restartGame(ball);
}

function ShowGameWin(ball) {
    ctx.fillStyle = 'white';
    ctx.font = "50px 'Jersey 15'";

    ctx.textAlign = 'center';
    ctx.fillText('You Won ', canvas.width/2, canvas.height/2);

    ball.dx = 0;
    ball.dy = 0;
    restartGame(ball);
}

function restartGame(ball) {
    const restartButton = document.getElementById("restartButton");

    restartButton.textContent = "Restart";
    restartButton.style.position = 'absolute';
    restartButton.style.display = 'inline';

    restartButton.style.left = `${canvas.offsetLeft + canvas.width/2-50}px`;
    restartButton.style.top = `${canvas.offsetTop + canvas.height/2 + 60}px`;

    // Add click event listener to restart the game
    restartButton.addEventListener('click', () => {
        document.location.reload()
        clearCanvasAndRedraw(ball);
    });

}

function ContinueGame(ball) {
    const continueButton = document.getElementById("continueButton");

    continueButton.textContent = "Continue";
    continueButton.style.display = 'inline';
    continueButton.style.position = 'absolute';

    continueButton.style.left = `${canvas.offsetLeft + canvas.width/2-50}px`;
    continueButton.style.top = `${canvas.offsetTop + canvas.height/2 + 20}px`;

    // Add click event listener to restart the game
    continueButton.addEventListener('click', () => {
        continueButton.style.display = 'none';
        document.getElementById('restartButton').style.display = 'none';
        ball.dx = tempDx;
        ball.dy = tempDy; 
        clearCanvasAndRedraw(ball);
    });

    document.body.appendChild(continueButton);
}


function StopGame(ball) {
    tempDx = ball.dx;
    tempDy = ball.dy;
    ball.dx = 0;
    ball.dy = 0;
    restartGame(ball);
    ContinueGame(ball);
}

// Function to clear the canvas and redraw the puddle
function clearCanvasAndRedraw(element) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas

    element.draw(ctx);
}

export {Board, DrawHUD, ShowGameOver, ShowGameWin, StopGame};