const HALF = 0.5;

/**
 * @class Color
 * @public
 * @static
 */
export default class Color {
    /**
     * Convert int to rgb
     */
    public static intToRgb(color: number): {r: number, g: number, b: number} {
        return {
            r: color >> 16 & 0xFF,
            g: color >> 8 & 0xFF,
            b: color & 0xFF
        };
    }

    /**
     * Convert rgb to int
     */
    public static rgbToInt(color: {r: number, g: number, b: number}): number {
        return (color.r << 16) + (color.g << 8) + color.b;
    }

    public static intToCss(color: number): string {
        let css = "000000" + color.toString(16);
        return "#" + css.substr(-6);
    }

    /**
     * Mix two colours
     */
    public static mixColors(c1: number, c2: number): number {
        let color1 = Color.intToRgb(c1);
        let color2 = Color.intToRgb(c2);

        return Color.rgbToInt({
            r: (color1.r > color2.r) ? color1.r : color2.r,
            g: (color1.g > color2.g) ? color1.g : color2.g,
            b: (color1.b > color2.b) ? color1.b : color2.b
        });
    }

    /**
     * Add two colours
     */
    public static addColors(c1: number, c2: number): number {
        let color1 = Color.intToRgb(c1);
        let color2 = Color.intToRgb(c2);

        return Color.rgbToInt({
            r: Math.floor((HALF * color1.r) + (HALF * color2.r)),
            g: Math.floor((HALF * color1.g) + (HALF * color2.g)),
            b: Math.floor((HALF * color1.b) + (HALF * color2.b))
        });
    }

    /**
     * Add two colours based on their intensity
     */
    public static addColorsByIntensity(c1: number, c2: number, i1: number, i2: number): number {
        let color1 = Color.intToRgb(c1);
        let color2 = Color.intToRgb(c2);

        return Color.rgbToInt({
            r: (0.5 * color1.r * i1) + (0.5 * color2.r * i2),
            g: (0.5 * color1.g * i1) + (0.5 * color2.g * i2),
            b: (0.5 * color1.b * i1) + (0.5 * color2.b * i2)
        });
    }

    /**
     * Mix two colours based on their intensity
     */
    public static mixColorsByIntensity(c1: number, c2: number, i1: number, i2: number): number {
        let color1 = Color.intToRgb(c1);
        let color2 = Color.intToRgb(c2);

        return Color.rgbToInt({
            r: (color1.r * i1 > color2.r * i2) ? color1.r : color2.r,
            g: (color1.g * i1 > color2.g * i2) ? color1.g : color2.g,
            b: (color1.b * i1 > color2.b * i2) ? color1.b : color2.b
        });
    }

    /**
     * Apply intensity to colour
     */
    public static applyIntensity(c: number, intensity: number): number {
        let color = Color.intToRgb(c);

        color.r = Math.floor(color.r * intensity);
        color.g = Math.floor(color.g * intensity);
        color.b = Math.floor(color.b * intensity);

        return Color.rgbToInt(color);
    }
}
