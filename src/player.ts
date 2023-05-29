import type { Game } from "./game";
import { Obstacle } from "./obstacle";

export class Player {
    game: Game;
    collisionX: number;
    collisionY: number;
    collisionRadius: number;
    speedX: number;
    speedY: number;
    dx: number;
    dy: number;
    speedModifier: number;

    constructor(game: Game) {
        this.game = game;
        this.collisionX = this.game.width * 0.5;
        this.collisionY = this.game.height * 0.5;
        this.collisionRadius = 50;
        this.speedX = 0;
        this.speedY = 0;
        this.dx = 0;
        this.dy = 0;
        this.speedModifier = 5;
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
        context.beginPath();
        context.moveTo(this.collisionX, this.collisionY);
        context.lineTo(this.game.mouse.x, this.game.mouse.y);
        context.stroke();
    }

    update() {
        this.dx = this.game.mouse.x - this.collisionX;
        this.dy = this.game.mouse.y - this.collisionY;
        const distance = Math.hypot(this.dy, this.dx);
        if(distance > this.speedModifier) {
            this.speedX = this.dx / distance || 0;
            this.speedY = this.dy / distance || 0;
        }else{
            this.speedX = 0;
            this.speedY = 0;
        }
        
        this.collisionX += this.speedX * this.speedModifier;
        this.collisionY += this.speedY * this.speedModifier;

        this.game.obstacles.forEach(obstacle => {
            let [isCollision, distance, sumOfRadii, dx, dy] = this.game.checkCollision(this, obstacle);
            if(isCollision){

            }
        });
    }


}
