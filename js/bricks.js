 function Brick(x, y, width, height, color, visible=true,) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.visible = visible;

    this.draw = function(ctx) {
        if (this.visible) {
            ctx.beginPath();
            ctx.rect(this.x,this.y,this.width,this.height);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }

}

function createBricks(columns, rows, brickWidth, brickHeight, paddingBetween, offsetTop, offsetLeft, color) {
    const bricks = [];

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            const x = c * (brickWidth + paddingBetween) + offsetLeft;
            const y = r * (brickHeight + paddingBetween) + offsetTop;
            bricks.push(new Brick(x, y, brickWidth, brickHeight, color));
        }
    }

    return bricks;
}

function DrawBricks(bricks) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    bricks.forEach(brick => brick.draw(ctx));
}

export { DrawBricks, createBricks };