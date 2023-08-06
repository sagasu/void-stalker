export interface IDrawUpdate{
    draw(context: CanvasRenderingContext2D) : void;
    update() : void;
    collisionY: number;
}