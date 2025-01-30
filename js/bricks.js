 function Brick(x,y,width,height,color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.draw = function(ctx) {
        ctx.beginPath();

        ctx.rect(x,y,width,height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

}

function DrawBricks() {
    const canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        let columns = 13; // Number of columns of bricks
        let rows = 9;     // Number of rows of bricks

        let brickWidth = 40;  // Width of each brick
        let brickHeight = 15; // Height of each brick
        let padding = 10;     // Space between bricks
        let offsetTop = 30;   // Top margin
        let offsetLeft = 30;  // Left margin

        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows; r++) {
                // Calculate dynamic brick position
                let x = offsetLeft + c * (brickWidth + padding);
                let y = offsetTop + r * (brickHeight + padding);

                if (r < 3) {
                    let easyBrick = new Brick(x, y, brickWidth, brickHeight, "#611717");
                    easyBrick.draw(ctx);
                } else if (r >= 3 && r < 6) {
                    let easyBrick = new Brick(x, y, brickWidth, brickHeight, "#243a83");
                    easyBrick.draw(ctx);
                } else if (r >= 6 && r <= 9) {
                    let easyBrick = new Brick(x, y, brickWidth, brickHeight, "#906c3a");
                    easyBrick.draw(ctx);
                }
            }
        }
    }
}

export { DrawBricks };