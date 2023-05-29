import type { Game } from "./game";

export class Obstacle {
    game: Game;
    collisionX: number;
    collisionY: number;
    collisionRadius: number;
    image: CanvasImageSource;
    spriteWidth: number;
    spriteHeight: number;
    width: number;
    height: number;
    spriteX: number;
    spriteY: number;
    frameX: number;
    frameY: number;

    constructor(game : Game){
        const baseToBottom: number = 65;

        this.game = game;
        this.collisionX = Math.random() * this.game.width;
        this.collisionY = Math.random() * this.game.height;
        this.collisionRadius = 60;
        this.image = <CanvasImageSource>document.getElementById('obstacles')!;
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - baseToBottom;
        this.frameX = Math.floor(Math.random() * 4);
        this.frameY = Math.floor(Math.random() * 3);
    }

    draw(context: CanvasRenderingContext2D){
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 
                                      this.spriteX, this.spriteY, this.width, this.height);
        context.beginPath();
        context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
    }
}