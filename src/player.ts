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
    image: CanvasImageSource;
    spriteWidth: number;
    spriteHeight: number;
    width: any;
    height: number;
    spriteX: number;
    spriteY: number;
    frameX: number;
    frameY: number;

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

        this.spriteWidth = 255;
        this.spriteHeight = 255;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;

        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - 100;

        this.frameX = 0;
        this.frameY = 5;

        this.image = <CanvasImageSource>document.getElementById('bull');
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height);

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

        const angle = Math.atan2(this.dy, this.dx);
        
        if(angle < -2.74 || angle > 2.74) this.frameY = 6;
        else if(angle < -1.96) this.frameY = 7;
        else if(angle < -1.17) this.frameY = 0;
        else if(angle < -0.39) this.frameY = 1;
        else if(angle < 0.39) this.frameY = 2;
        else if(angle < 1.17) this.frameY = 3;
        else if(angle < 1.96) this.frameY = 4;
        else if(angle < 2.74) this.frameY = 5;
        

        const distance = Math.hypot(this.dy, this.dx);
        if(distance > this.speedModifier) {
            this.speedX = this.dx / distance || 0;
            this.speedY = this.dy / distance || 0;
        } else {
            this.speedX = 0;
            this.speedY = 0;
        }
        
        this.collisionX += this.speedX * this.speedModifier;
        this.collisionY += this.speedY * this.speedModifier;

        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5  - 100;

        this.game.obstacles.forEach(obstacle => {
            let [isCollision, distance, sumOfRadii, dx, dy] = this.game.checkCollision(this, obstacle);
            if(isCollision){
                const unitX = dx/ distance;
                const unitY = dy /distance;
                this.collisionX = obstacle.collisionX + (sumOfRadii + 1) * unitX;
                this.collisionY = obstacle.collisionY + (sumOfRadii + 1) * unitY;
            }
        });
    }
}


