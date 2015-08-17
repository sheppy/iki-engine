import IShape from "./IShape";

export default class Line implements IShape{
    public constructor(public x: number = 0, public y: number = 0, public x2: number = 0, public y2: number = 0) {}

    public static create(x: number = 0, y: number = 0, x2: number = 0, y2: number = 0): Line {
        return new Line(x, y, x2, y2);
    }

    public clone(): Line {
        return new Line(this.x, this.y, this.x2, this.y2);
    }

    public get lengthSquared(): number {
        let dx:number = (this.x2 - this.x);
        let dy:number = (this.y2 - this.y);
        return (dx * dx) + (dy * dy);
    }

    public get length(): number {
        return Math.sqrt(this.lengthSquared);
    }
}
