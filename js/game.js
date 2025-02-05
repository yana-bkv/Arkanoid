const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function Board() {
    canvas.width = 700;
    canvas.height = 500;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width , canvas.height);
}

// Show players stats 
function DrawHUD(hp, score) {
    // Set text styles
    ctx.fillStyle = 'white';
    ctx.font = "25px 'Jersey 15'";
    
    // Draw HP (left side)
    ctx.textAlign = 'left';
    ctx.fillText(`HP: ${hp}`, 20, canvas.height - 20);
    
    // Draw Score (right side)
    ctx.textAlign = 'right';
    ctx.fillText(`Score: ${score}`, canvas.width - 20, canvas.height - 20);
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

function continueGame(ball) {
    const continueButton = document.getElementById("continueButton");

    continueButton.textContent = "Continue";
    continueButton.style.display = 'inline';
    continueButton.style.position = 'absolute';

    continueButton.style.left = `${canvas.offsetLeft + canvas.width/2-50}px`;
    continueButton.style.top = `${canvas.offsetTop + canvas.height/2 + 20}px`;

    // Add click event listener to restart the game
    continueButton.addEventListener('click', () => {
        clearCanvasAndRedraw(ball);
        continueButton.style.display = 'none';
        document.getElementById('restartButton').style.display = 'none';
        ball.dx = 2;
        ball.dy = -3; 
        clearCanvasAndRedraw(ball);
    });

    document.body.appendChild(continueButton);
}


function StopGame(ball) {
    ball.dx = 0;
    ball.dy = 0;
    restartGame(ball);
    continueGame(ball);
}


export {Board, DrawHUD, ShowGameOver, ShowGameWin, StopGame};