/// <reference path="../../../typings/pixi.js/pixi.js.d.ts" />

import Tile from "./Tile";
import Tileset from "./Tileset";
import {ITiledTileset} from "./Tileset";

interface ITiledMapLayer {
    data: number[];
}

interface ITiledMap {
    width: number;
    height: number;
    tilewidth: number;
    tileheight: number;
    layers: ITiledMapLayer[];
    tilesets: ITiledTileset[];
}

export default class TileMap extends PIXI.Container {
    public mapWidth: number;
    public mapHeight: number;
    public tileSize: number;
    public zoom: number;
    public tileset: Tileset;

    constructor(width: number, height: number, tileSize: number = 16) {
        super();

        this.mapWidth = width;
        this.mapHeight = height;
        this.tileSize = tileSize;
        this.zoom = 1;

        this.scale.x = this.scale.y = this.zoom;
    }

    static createFromJson(json: Object): TileMap {
        let tiled = <ITiledMap> json;
        let map = new TileMap(tiled.width, tiled.height, tiled.tilewidth);

        // Create textures from tileset
        map.tileset = new Tileset(tiled.tilesets);
        map.tileset.generateTextures();

        for (var n = 0, m = map.mapWidth * map.mapHeight; n < m; n++) {
            let x = n % map.mapWidth;
            let y = (n - x) / map.mapHeight;

            map.addTile(x, y, "tiles.png[" + tiled.layers[0].data[n] + "]");
        }

        return map;
    }

    protected localToIndex(x: number, y: number): number {
        return y * this.mapWidth + x;
    }

    public addTile(x: number, y: number, textureName: string): void {
        let tile = new Tile(textureName);
        tile.tileX = x;
        tile.tileY = y;
        tile.position.x = x * this.tileSize;
        tile.position.y = y * this.tileSize;

        // console.log("add >", x, y, tile.position.x, tile.position.y, textureName);
        this.addChild(tile);
        //this.layers[0].addChildAt(tile, index);
    }
}
