import IShape from "./IShape";

export default class Point implements IShape {
    public constructor(public x: number = 0, public y: number = 0) {}

    public static create(x: number, y: number): Point {
        return new Point(x, y);
    }

    public clone(): Point {
        return new Point(this.x, this.y);
    }

    public distanceFromPointSquared(x: number = 0, y: number = 0): number {
        let dx: number = (x - this.x);
        let dy: number = (y - this.y);
        return (dx * dx) + (dy * dy);
    }

    public distanceFromPoint(x: number = 0, y: number = 0): number {
        return Math.sqrt(this.distanceFromPointSquared(x ,y));
    }
}
