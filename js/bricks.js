 function Brick(x,y,width,height,color,paddingBetween,offsetTop,offsetLeft) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.paddingBetween = paddingBetween;
    this.offsetTop = offsetTop;
    this.offsetLeft = offsetLeft;

    this.columns = 13;
    this.rows = 9;

    this.draw = function(ctx) {
        ctx.beginPath();

        ctx.rect(x,y,width,height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

}

function DrawBricks(easyBrick,mediumBrick,hardBrick) {
    const canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        for (let c = 0; c < easyBrick.columns; c++) {
            for (let r = 0; r < easyBrick.rows; r++) {

                if (r < 3) {
                    easyBrick.draw(ctx);
                } else if (r >= 3 && r < 6) {
                    mediumBrick.draw(ctx);
                } else if (r >= 6 && r <= 9) {
                    hardBrick.draw(ctx);
                }
            }
        }
    }
}

export { Brick, DrawBricks };