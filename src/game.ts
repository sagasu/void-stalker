import { Egg } from './egg.js';
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
    fps: number;
    timer: number;
    interval: number;
    eggs: Egg[];
    maxEggs: number;
    eggTimer: number;
    eggInterval: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
        this.numberOfObstacles = 10;
        this.obstacles = [];
        this.topMargin = 260;
        this.isDebug = false;
        this.fps = 80;
        this.timer = 0;
        this.interval = 1000/this.fps;
        this.eggTimer = 0;
        this.eggInterval = 1000;
        this.eggs = [];
        this.maxEggs = 10;

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

    render(ctx: CanvasRenderingContext2D, deltaTime: number) {
        if(this.timer > this.interval) {
            ctx.clearRect(0,0, this.width, this.height);
            this.obstacles.forEach(obstacle => obstacle.draw(ctx));
            this.eggs.forEach(egg => {
                egg.draw(ctx);
                egg.update();
            });
            this.player.draw(ctx);
            this.player.update();
            this.timer = 0;
        }
        this.timer += deltaTime;
        
        if(this.eggTimer > this.eggInterval && this.eggs.length < this.maxEggs){
            this.addEgg();
            this.eggTimer = 0;
        }else{
            this.eggTimer += deltaTime;
        }
    }

    checkCollision(a: ICollision, b: ICollision):[boolean, number, number, number, number] {
        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;
        const distance = Math.hypot(dy, dx);
        const sumOfRadii = a.collisionRadius + b.collisionRadius;
        return [distance < sumOfRadii, distance, sumOfRadii, dx, dy];
    }

    addEgg(){
        this.eggs.push(new Egg(this));
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

            const margin = testObstacle.collisionRadius * 3;
            if(!isOverlap &&
                 testObstacle.spriteX > 0 && testObstacle.spriteX < this.width - testObstacle.width &&
                 testObstacle.collisionY > this.topMargin + margin && testObstacle.collisionY < this.height - margin) this.obstacles.push(testObstacle);
        }
    }
}