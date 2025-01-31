 function Brick(x, y, width, height, color, columns, rows, paddingBetween,offsetTop,offsetLeft) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.columns = columns;
    this.rows = rows;

    this.paddingBetween = paddingBetween;
    this.offsetTop = offsetTop;
    this.offsetLeft = offsetLeft;

    this.draw = function(ctx) {
        ctx.beginPath();

        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

}

function DrawBricks(easy,medium,hard) {
    const canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        function differentLevels(level) {
            // Draw easy bricks
            for (let c = 0; c < level.columns; c++) {
                for (let r = 0; r < level.rows; r++) {
                    level.x = c * (level.width + level.paddingBetween) + level.offsetLeft;
                    level.y = r * (level.height + level.paddingBetween) + level.offsetTop;
                
                    level.draw(ctx);
                }
            }
        }

        differentLevels(easy);
        differentLevels(medium);
        differentLevels(hard);

    }
}

export { Brick, DrawBricks };