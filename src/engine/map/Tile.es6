import PIXI from "pixi.js";
import Color from "./graphics/Color";

/**
 * @class Tile
 */
export default class Tile extends PIXI.Sprite {
    /**
     * @constructs Tile
     * @param {String} textureName
     */
    constructor(textureName) {
        let texture = PIXI.utils.TextureCache[textureName];
        super(texture);

        // Tile data such as walkable etc
        this.data = {};
    }

    setLightData(light) {
        this.tint = Color.applyIntensity(light.color, light.intensity);
    }
}
