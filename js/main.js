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



// сделано движение доски, нарисован весь канвас
// надо сделать механику соприкосновения с объектами, отскакивание от стен и ломание блоков
// добавить ХП и Счет игрока
// возможность поставить на паузу и начать сначала