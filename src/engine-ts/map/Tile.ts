/// <reference path="../../../typings/pixi.js/pixi.js.d.ts" />

import Color from "../Graphics/Color"
import {ITileLight} from "./TileLight"

export default class Tile extends PIXI.Sprite {
    // Tile data such as walkable etc
    public data: Object = {};
    public tileX: number;
    public tileY: number;
    public lighting: ITileLight;

    constructor(textureName: string) {
        super();
        if (textureName) {
            this.texture = PIXI.utils.TextureCache[textureName];
        }
    }

    public applyLighting(): void {
        this.tint = Color.applyIntensity(this.lighting.color, this.lighting.intensity);
    }
}
