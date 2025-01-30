function Puddle(x,y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
    
        // Draw a rectangle
        ctx.rect(this.x, this.y, this.width, this.height); // x, y, width, height, radius
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
}

function DrawPuddle(puddle) {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        puddle.draw(ctx);   
    }
}

export { Puddle, DrawPuddle };