import AbstractMap2D from "./AbstractMap2D";

// https://github.com/sheppy/mercenary-strike-force/blob/develop/src/engine/LightMap.js
/**
 * 2D light map class
 * @extends AbstractMap2D
 * @class LightMap2d
 * @public
 */
export default class LightMap2d extends AbstractMap2D {
    /**
     * @constructs LightMap2d
     * @param {number} width - Width of the map
     * @param {number} height - Height of the map
     * @param {Object} ambient - Ambient light settings
     * @param {number} [ambient.color=0x000000] - Ambient light color
     * @param {number} [ambient.intensity=0] - Ambient light intensity
     */
    constructor(width, height, ambient = {}) {
        super(width, height);

        // An array of the lights on the map
        this.lights = [];

        // Ambient lighting
        this.ambient = {
            color: ambient.color || 0x000000,
            intensity: ambient.intensity || 0
        };
    }

    /**
     * @inheritdoc
     */
    initTile(tile) {
        tile.color = this.ambient.color;
        tile.intensity = this.ambient.intensity;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {Object} settings
     * @param {number} [settings.radius=16]
     * @param {number} [settings.intensity=1]
     * @param {number} [settings.color=0xFFFFFF]
     * @param {boolean} [settings.dynamic=false]
     */
    addLight(x, y, settings = {}) {
        this.lights.push({
            x,
            y,
            radius: settings.radius || 16,
            intensity: settings.intensity || 1,
            color: settings.color || 0xFFFFFF,
            dynamic: settings.dynamic || false
        });
    }
}
