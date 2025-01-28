import { Field } from './game.js';
import { DrawBall } from './ball.js';
import { DrawPuddle } from './puddle.js';
import { DrawBricks } from './bricks.js'
 
function draw() {
    Field();
    DrawBall();
    DrawPuddle();
    DrawBricks();
}

function loop() {
    draw();
    window.requestAnimationFrame(loop);
}

loop();