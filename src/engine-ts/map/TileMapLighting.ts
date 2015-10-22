/// <reference path="../../../typings/lodash/lodash.d.ts" />
import Util from "../Util";
import Color from "../graphics/Color";
import Tile from "./Tile";
import {ITiledMap, TileMap} from "./TileMap";
import {ITileLight, TileLight} from "./TileLight";

export default class TileMapLighting extends TileMap {
    public ambient: ITileLight;
    public lights: TileLight[] = [];

    constructor(width:number, height:number, tileSize:number = 16, ambient?:ITileLight) {
        super(width, height, tileSize);

        this.ambient = ambient;
    }

    protected static create(width:number, height:number, tileSize:number = 16, ambient?:ITileLight):TileMapLighting {
        return new TileMapLighting(width, height, tileSize, ambient);
    }

    protected initTile(tile: Tile): void {
        // Default lighting to ambient
        tile.lighting = {
            color: this.ambient.color,
            intensity: this.ambient.intensity
        };
    }

    preCreate(data:ITiledMap): void {
        // Set Ambient lighting
        if (!this.ambient) {
            this.ambient = {
                color: parseInt(data.properties["ambientColor"] || 0x00ff99, 16),
                intensity: parseFloat(data.properties["ambientIntensity"] || 0.3)
            };
        }
    }

    postCreate(data:ITiledMap): void {
        // Add lights from map data
        for (let lightData of this.objects["Lights"]) {
            this.lights.push(new TileLight(lightData.x/lightData["width"], lightData.y/lightData["height"], {
                color: parseInt(lightData.properties["color"], 16),
                intensity: parseFloat(lightData.properties["intensity"]),
                radius: parseInt(lightData.properties["radius"], 10)
            }));
        }

        // Generate lighting based on ray casting
        for (let light of this.lights) {
            let lines = [];

            for (let x = 0; x < this.mapWidth; x++) {
                let northBorderPoint = {x: x, y: 0};
                let southBorderPoint = {x: x, y: this.mapHeight - 1};

                lines = lines.concat(this.rayTraceLine(light, northBorderPoint));
                lines = lines.concat(this.rayTraceLine(light, southBorderPoint));
            }

            for (let y = 0; y < this.mapHeight; y++) {
                let leftBorderPoint = {x: 0, y: y};
                let rightBorderPoint = {x: this.mapWidth - 1, y: y};

                lines = lines.concat(this.rayTraceLine(light, leftBorderPoint));
                lines = lines.concat(this.rayTraceLine(light, rightBorderPoint));
            }


            lines = _.uniq(lines, function (n) {
                return JSON.stringify(n);
            });
            this.lightLine(lines, light);
        }



        // Update all tiles lighting states
        for (let layer of this.children) {
            let theLayer: PIXI.Container = <PIXI.Container>layer;
            let tiles = <Tile[]>theLayer.children;
            for (let tile of tiles) {
                // Set the tint of the tile for rendering
                tile.applyLighting();
            }
        }
    }

    setTileLighting(tile, color, intensity) {
        let rgb1 = Color.intToRgb(tile.lighting.color);
        let rgb2 = Color.intToRgb(color);

        let ratio1 = tile.lighting.intensity / (intensity + tile.lighting.intensity);
        let ratio2 = intensity / (intensity + tile.lighting.intensity);

        //let ratio1 = 1;
        //let ratio2 = 1;
        //
        //if (intensity > tile.lighting.intensity) {
        //    ratio1 = tile.lighting.intensity / (intensity + tile.lighting.intensity);
        //    ratio2 = intensity / (intensity + tile.lighting.intensity);
        //} else {
        //    ratio1 = tile.lighting.intensity / (intensity + tile.lighting.intensity);
        //    ratio2 = intensity / (intensity + tile.lighting.intensity);
        //}
        //
        //console.log(ratio1, ratio2);

        let r = (rgb1.r * ratio1) + (rgb2.r * ratio2);
        let g = (rgb1.g * ratio1) + (rgb2.g * ratio2);
        let b = (rgb1.b * ratio1) + (rgb2.b * ratio2);

        let max = Math.max(r, g, b);


        tile.lighting.intensity = Math.max(intensity, tile.lighting.intensity);


        if (max > 255) {
            let scale = (255 / max) * tile.lighting.intensity;
            r = r * scale;
            g = g * scale;
            b = b * scale;
        }

        tile.lighting.color = Color.rgbToInt({
            r: r,
            g: g,
            b: b,
        });
    }

    private lightLine(line, light) {
        console.log("[lightLine]");
        for (var n = 0; n < line.length; n++) {
            var dist = Util.distance(line[0], line[n]);

            var intensity = light.intensity * Util.attenuation(light.radius, 0.1, dist);

            if (intensity > 0) {
                var x = line[n].x;
                var y = line[n].y;

                // Set tile lighting
                let tiles:Tile[] = this.getTilesAt(x, y);
                for (let tile of tiles) {
                    this.setTileLighting(tile, light.color, intensity);
                }
            }

            // Check if view blocked
            //if (!map.isViewBlocked(line[n])) {
            //    break;
            //}
        }
    }

    private rayTraceLine(start, target) {
        var ret = [];
        var n = 100;    // max draw distance

        var x0 = start.x;
        var y0 = start.y;

        var x1 = target.x;
        var y1 = target.y;

        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);

        var sx = x0 < x1 ? 1 : -1;
        var sy = y0 < y1 ? 1 : -1;

        var error = dx - dy;

        dx = dx * 2;
        dy = dy * 2;

        while (n > 0) {
            // Check we are in map bounds
            if (x0 < 0 || y0 < 0 || x0 >= this.mapWidth || y0 >= this.mapHeight) {
                break;
            }

            ret.push({x: x0, y: y0});

            if (error > 0) {
                x0 += sx;
                error -= dy;
            } else {
                y0 += sy;
                error += dx;
            }

            // TODO: Maybe break if we hit a wall?
            //if ((x0 === 4 && y0 === 2)) {
            //    break;
            //}

            --n;
        }

        return ret;
    }
}
