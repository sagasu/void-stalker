import type { Game } from "./game";

export class DebugUtils{
    draw(ctx: CanvasRenderingContext2D, game: Game, collisionX: number, collisionY: number, collisionRadius: number){
        if(game.isDebug){
            ctx.beginPath();
            ctx.arc(collisionX, collisionY, collisionRadius, 0, Math.PI * 2);
            ctx.save();
            ctx.globalAlpha = 0.5;
            ctx.fill();
            ctx.restore();
            ctx.stroke();
        }
    }
}