import {Game} from './game.js';

window.addEventListener('load', () => {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas1');
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';

    canvas.width = 1280;
    canvas.height = 720; 

    const game = new Game(canvas);
    game.init();
    console.log(game);
    
    function animate(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        game.render(ctx);
        window.requestAnimationFrame(animate);
    }

    animate();
});
