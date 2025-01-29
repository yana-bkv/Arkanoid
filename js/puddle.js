function Puddle(pHeight,pWidth,pX,pY,pColor) {
    this.pHeight = pHeight;
    this.pWidth = pWidth;
    this.pX = pX;
    this.pY = pY;
    this.pColor = pColor;

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
    
        // Draw a rectangle
        ctx.rect(this.pX, this.pY, this.pWidth, this.pHeight); // x, y, width, height, radius
        ctx.fillStyle = this.pColor;
        ctx.fill();
        ctx.stroke();
    }
}
// Create the puddle object globally so it can be updated on each key press
let puddle = new Puddle(10, 40, 330, 420, "white");

function DrawPuddle() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        puddle.draw(ctx);   
    }
}

// Function to clear the canvas and redraw the puddle
function clearCanvasAndRedraw() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas

    puddle.draw(ctx);  // Redraw puddle at the new position
}

// Add event listener to handle keypresses and move the puddle
document.addEventListener('keydown', function(event) {
    const canvas = document.getElementById("canvas");

    // Arrow key movement logic
    if (event.key === "ArrowLeft") {
        console.log("Left arrow pressed");
        puddle.pX = Math.max(0, puddle.pX - 15);  // Move left, don't go off-screen
    }
    if (event.key === "ArrowRight") {
        console.log("Right arrow pressed");
        puddle.pX = Math.min(canvas.width - puddle.pWidth, puddle.pX + 15);   // Move right, don't go off-screen
    }

    clearCanvasAndRedraw();  
});

export { Puddle, DrawPuddle };