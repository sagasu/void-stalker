import type { Game } from "./game";

export class Enemy {
    game: Game;
    collisionY: number;
    collisionX: number;
    collisionRadius: number;
    speedX: number;

    constructor(game: Game){
        this.game = game;
        this.collisionRadius = 30;
        this.collisionX = this.game.width;
        this.collisionY = Math.random() * this.game.height;
        this.speedX = Math.random() * 3 + 0.5;

    }
}