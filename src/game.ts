import {Player} from './player.js';

export class Game {
    canvas: any;
    width: number;
    height: any;
    player: Player;
    mouse: { x: number; y: number; pressed: boolean; };
    
    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
        this.mouse = {
            x: this.width * 0.5,
            y: this.height * 0.5,
            pressed: false
        };

        window.addEventListener('mousedown', (e) => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = true;
        });

        window.addEventListener('mouseup', (e) => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = false;
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        });
    }

    render(context: CanvasRenderingContext2D){
        this.player.draw(context);
        this.player.update();
    }
}