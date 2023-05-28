import {Game} from './game.js';
// export function foo() {

window.addEventListener('load', () => {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas1');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';

    canvas.width = 1280;
    canvas.height = 720;

    const game = new Game(canvas);
    game.render(ctx);

    function animate(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.render(ctx);
        window.requestAnimationFrame(animate);
    }

    animate();
});


// }