/**
 * @class Color
 * @public
 * @static
 */
export default class Color {
    /**
     * Convert int to rgb
     * @param {number} color
     * @returns {{r: number, g: number, b: number}}
     */
    static intToRgb(color) {
        return {
            r: color >> 16 & 0xFF,
            g: color >> 8 & 0xFF,
            b: color & 0xFF
        };
    }

    /**
     * Convert rgb to int
     * @param {Object} color
     * @param {number} color.r
     * @param {number} color.g
     * @param {number} color.b
     * @returns {number}
     */
    static rgbToInt(color) {
        return (color.r << 16) + (color.g << 8) + color.b;
    }

    /**
     * Mix two colours
     * @param {number} c1
     * @param {number} c2
     * @returns {number}
     */
    static mixColors(c1, c2) {
        let color1 = Color.intToRgb(c1);
        let color2 = Color.intToRgb(c2);

        let res = {
            r: (color1.r > color2.r) ? color1.r : color2.r,
            g: (color1.g > color2.g) ? color1.g : color2.g,
            b: (color1.b > color2.b) ? color1.b : color2.b
        };

        return Color.rgbToInt(res);
    }

    /**
     * Add two colours
     * @param {number} c1
     * @param {number} c2
     * @returns {number}
     */
    static addColors(c1, c2) {
        let color1 = Color.intToRgb(c1);
        let color2 = Color.intToRgb(c2);

        let res = {
            r: Math.floor((0.5 * color1.r) + (0.5 * color2.r)),
            g: Math.floor((0.5 * color1.g) + (0.5 * color2.g)),
            b: Math.floor((0.5 * color1.b) + (0.5 * color2.b))
        };

        return Color.rgbToInt(res);
    }

    /**
     * Add two colours based on their intensity
     * @param {number} c1
     * @param {number} c2
     * @param {number} i1
     * @param {number} i2
     * @returns {number}
     */
    static addColorsByIntensity(c1, c2, i1, i2) {
        let color1 = Color.intToRgb(c1);
        let color2 = Color.intToRgb(c2);

        let res = {
            r: (0.5 * color1.r * i1) + (0.5 * color2.r * i2),
            g: (0.5 * color1.g * i1) + (0.5 * color2.g * i2),
            b: (0.5 * color1.b * i1) + (0.5 * color2.b * i2)
        };

        return Color.rgbToInt(res);
    }

    /**
     * Mix two colours based on their intensity
     * @param {number} c1
     * @param {number} c2
     * @param {number} i1
     * @param {number} i2
     * @returns {number}
     */
    static mixColorsByIntensity(c1, c2, i1, i2) {
        let color1 = Color.intToRgb(c1);
        let color2 = Color.intToRgb(c2);

        let res = {
            r: (color1.r * i1 > color2.r * i2) ? color1.r : color2.r,
            g: (color1.g * i1 > color2.g * i2) ? color1.g : color2.g,
            b: (color1.b * i1 > color2.b * i2) ? color1.b : color2.b
        };

        return Color.rgbToInt(res);
    }

    /**
     * Apply intensity to colour
     * @param {number} c
     * @param {number} intensity
     * @returns {number}
     */
    static applyIntensity(c, intensity) {
        let color = Color.intToRgb(c);

        color.r = Math.floor(color.r * intensity);
        color.g = Math.floor(color.g * intensity);
        color.b = Math.floor(color.b * intensity);

        return Color.rgbToInt(color);
    }
}
