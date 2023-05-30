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
    topMargin: number;
    isDebug: boolean;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
        this.numberOfObstacles = 10;
        this.obstacles = [];
        this.topMargin = 260;
        this.isDebug = false;
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

        window.addEventListener('keydown', (e) => {
            if (e.key == 'd') this.isDebug = !this.isDebug;
        });
    }

    render(context: CanvasRenderingContext2D) {
        this.player.draw(context);
        this.player.update();
        this.obstacles.forEach(obstacle => obstacle.draw(context));
    }

    checkCollision(a: Player, b: Obstacle):[boolean, number, number, number, number] {
        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;
        const distance = Math.hypot(dy, dx);
        const sumOfRadii = a.collisionRadius + b.collisionRadius;
        return [distance < sumOfRadii, distance, sumOfRadii, dx, dy];
    }

    init(){
        for(let attempts = 0; attempts < 300; attempts++){
            if(this.obstacles.length >= this.numberOfObstacles) break;

            let isOverlap = false;
            let testObstacle = new Obstacle(this);

            this.obstacles.forEach(obstacle => {
                const dx = testObstacle.collisionX - obstacle.collisionX;
                const dy = testObstacle.collisionY - obstacle.collisionY;
                const distance = Math.hypot(dy, dx);
                const distanceBuffer = 150;
                const sumOfRadii = testObstacle.collisionRadius + obstacle.collisionRadius + distanceBuffer;
                if(distance < sumOfRadii) isOverlap = true; 
            });

            const margin = testObstacle.collisionRadius * 2;
            if(!isOverlap &&
                 testObstacle.spriteX > 0 && testObstacle.spriteX < this.width - testObstacle.width &&
                 testObstacle.collisionY > this.topMargin + margin && testObstacle.collisionY < this.height - margin) this.obstacles.push(testObstacle);
        }
    }
}