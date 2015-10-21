export interface ITileLight {
    color: number;
    intensity: number;
    radius?: number;
}


export class TileLight {
    public x: number;
    public y: number;
    public light: ITileLight;

    constructor(x: number, y: number, light: ITileLight) {
        this.x = x;
        this.y = y;
        this.light = light;
    }

    public get color(): number {
        return this.light.color;
    }

    public get intensity(): number {
        return this.light.intensity;
    }

    public get radius(): number {
        return this.light.radius;
    }
}

export default TileLight;
