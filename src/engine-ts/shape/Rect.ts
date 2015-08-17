import IShape from "./IShape";

export default class Rect implements IShape {
    public constructor(public x: number = 0, public y: number = 0, public width: number = 0, public height: number = 0) {}

    public static create(x: number = 0, y: number = 0, width: number = 0, height: number = 0): Rect {
        return new Rect(x, y, width, height);
    }

    public clone(): Rect {
        return new Rect(this.x, this.y, this.width, this.height);
    }

    public get area(): number {
        return this.width * this.height;
    }

    public get x2(): number {
        return this.x + this.width;
    }

    public set x2(x: number) {
        this.width = this.x - x;
    }

    public get y2(): number {
        return this.y + this.height;
    }

    public set y2(y: number) {
        this.height = this.y - y;
    }

    //public get bounds(): Rect {
    //    throw new Error("Method not implemented");
    //}

    public contains(x: number, y: number): boolean {
        throw new Error("Method not implemented");
    }
}
