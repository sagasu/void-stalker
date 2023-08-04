import { DebugUtils } from "./debugUtils";
import type { Game } from "./game";

export class Egg implements ICollision{
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
    margin: number;

    constructor(game : Game){
        this.game = game;
        this.collisionRadius = 40;
        this.margin = this.collisionRadius * 2;

        this.collisionX = this.margin + (Math.random() * (this.game.width - this.margin * 2));
        this.collisionY = this.game.topMargin + (Math.random() * (this.game.height - this.game.topMargin - this.margin));
        this.image = <CanvasImageSource>document.getElementById('egg');
        this.spriteWidth = 110;
        this.spriteHeight = 135;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 + 35;
        this.debugUtils = new DebugUtils();
    }

    draw(ctx: CanvasRenderingContext2D){
        ctx.drawImage(this.image, this.spriteX, this.spriteY);

        this.debugUtils.draw(ctx, this.game, this.collisionX, this.collisionY, this.collisionRadius);
    }

    update(){
        let collisionObject = [this.game.player, ...this.game.obstacles];
        collisionObject.forEach(object => {
            let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollision(this, object);
        });
    }
}