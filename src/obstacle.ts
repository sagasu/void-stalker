import type { Game } from "./game";

export class Obstacle {
    game: Game;
    collisionX: number;
    collisionY: number;
    collisionRadius: number;

    constructor(game : Game){
        this.game = game;
        this.collisionX = Math.random() * this.game.width;
        this.collisionY = Math.random() * this.game.height;
        this.collisionRadius = 100;
    }

    draw(context: CanvasRenderingContext2D){
        context.beginPath();
        context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
    }
}