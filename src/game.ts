import { Obstacle } from './obstacle.js';
import { Player } from './player.js';

export class Game {
    canvas: any;
    width: number;
    height: any;
    player: Player;
    mouse: { x: number; y: number; pressed: boolean; };
    obstacles: Obstacle[];
    numberOfObstacles: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
        this.numberOfObstacles = 5;
        this.obstacles = [];
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
            if (this.mouse.pressed) {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
            }
        });
    }

    render(context: CanvasRenderingContext2D) {
        this.player.draw(context);
        this.player.update();
        this.obstacles.forEach(obstacle => obstacle.draw(context));
    }

    init(){
        for(let i = 0; i< this.numberOfObstacles;i++){
            this.obstacles.push(new Obstacle(this));
        }
    }
}