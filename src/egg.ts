import { DebugUtils } from "./debugUtils";
import type { Game } from "./game";

class Egg {
    game: Game;
    collisionY: number;
    collisionX: number;
    collisionRadius: number;
    image: CanvasImageSource;
    spriteWidth: number;
    spriteHeight: number;
    width: any;
    height: number;
    spriteX: number;
    spriteY: number;
    debugUtils: DebugUtils;

    constructor(game : Game){
        this.game = game;
        this.collisionX = Math.random() * this.game.width;
        this.collisionY = Math.random() * this.game.height;
        this.collisionRadius = 40;
        this.image = <CanvasImageSource>document.getElementById('egg');
        this.spriteWidth = 110;
        this.spriteHeight = 135;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.spriteX = this.collisionX + this.width * 0.5;
        this.spriteY = this.collisionY + this.height * 0.5;
        this.debugUtils = new DebugUtils();
    }

    draw(ctx: CanvasRenderingContext2D){
        ctx.drawImage(this.image, this.spriteX, this.spriteY);

        this.debugUtils.draw(ctx, this.game, this.collisionX, this.collisionY, this.collisionRadius);
    }

}