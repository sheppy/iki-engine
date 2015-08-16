import Point from "./Point";

export default class Line {
    public constructor(public start: Point, public end: Point) {}

    public create(x1: number, y1: number, x2: number, y2: number): Line {
        return new Line(Point.create(x1, y1), Point.create(x2, y2));
    }

    public create(start: {x: number, y: number}, end: {x: number, y: number}): Line {
        return new Line(Point.create(start), Point.create(end));
    }

    //constructor(startX:number, startY:number, endX:number, endY:number) {
    //    this.start = new Point(startX, startY);
    //    this.end = new Point(endX, endY);
    //}

    public get lengthSquared(): number {
        return this.start.distanceFromPointSquared(this.end);
    }

    public get length(): number {
        return this.start.distanceFromPoint(this.end);
    }
}
