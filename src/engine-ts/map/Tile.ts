/// <reference path="../../../typings/pixi.js/pixi.js.d.ts" />

export default class Tile extends PIXI.Sprite {
    // Tile data such as walkable etc
    public data: Object = {};
    public tileX: number;
    public tileY: number;

    constructor(textureName: string) {
        super();
        this.texture = PIXI.utils.TextureCache[textureName];
    }

    //setLightData(light) {
    //    this.tint = Color.applyIntensity(light.color, light.intensity);
    //}
}
