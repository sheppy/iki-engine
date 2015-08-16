export default class Point {
    public constructor(public x: number, public y: number) {}

    public static create(x: number, y: number): Point {
        return new Point(x, y);
    }

    public static create(position: {x: number, y: number}): Point {
        return new Point(position.x, position.y);
    }

    public distanceFromPointSquared(point: Point): number {
        let dx: number = (point.x - this.x);
        let dy: number = (point.y - this.y);
        return (dx * dx) + (dy * dy);
    }

    public distanceFromPoint(point: Point): number {
        return Math.sqrt(this.distanceFromPointSquared(point));
    }
}
