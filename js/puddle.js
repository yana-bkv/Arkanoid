function Puddle(pHeight,pWidth,pX,pY,pColor) {
    this.pHeight = pHeight;
    this.pWidth = pWidth;
    this.pX = pX;
    this.pY = pY;
    this.pColor = pColor;

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.fillStyle = pColor;
        ctx.strokeStyle = 'black';
    
        // Draw a rounded rectangle
        drawRoundedRect(ctx, pX, pY, pWidth, pHeight, 20); // x, y, width, height, radius
        ctx.fill();
        ctx.stroke();
    }
}

function DrawPuddle() {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        var puddle = new Puddle(10,35,334,420,"white");
        puddle.draw(ctx);

        document.addEventListener('keydown', function(event) {
            if (event.key === "ArrowLeft") {
                console.log("Left arrow");
                puddle.pX = puddle.pX - 5;  // Move left but prevent going out of bounds
                clearCanvasAndRedraw(); // Clear canvas and redraw puddle at new position
            }
            if (event.key === "ArrowRight") {
                console.log("Right arrow");
                puddle.pX = puddle.pX + 5 ; // Move right but prevent going out of bounds
                clearCanvasAndRedraw(); // Clear canvas and redraw puddle at new position
            }
        });
        
    }

    function clearCanvasAndRedraw() {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
    
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Redraw puddle at its new position
        puddle.draw(ctx);
    }
}


// Draw beautiful rectangle for puddle object
function drawRoundedRect(ctx, x, y, width, height, radius) {
    // Ensure the radius is not larger than half the width/height
    if (radius > width / 2) radius = width / 2;
    if (radius > height / 2) radius = height / 2;

    ctx.beginPath();
    ctx.moveTo(x + radius, y);                     // Start at the top-left corner (adjusted for radius)
    ctx.lineTo(x + width - radius, y);            // Top edge
    ctx.arcTo(x + width, y, x + width, y + radius, radius);   // Top-right corner
    ctx.lineTo(x + width, y + height - radius);   // Right edge
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius); // Bottom-right corner
    ctx.lineTo(x + radius, y + height);           // Bottom edge
    ctx.arcTo(x, y + height, x, y + height - radius, radius); // Bottom-left corner
    ctx.lineTo(x, y + radius);                    // Left edge
    ctx.arcTo(x, y, x + radius, y, radius);       // Top-left corner
    ctx.closePath();
}

export { DrawPuddle };