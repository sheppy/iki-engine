/// <reference path="../../../typings/pixi.js/pixi.js.d.ts" />

import Tile from "./Tile";

export default class TileMap extends PIXI.Container {
    public mapWidth: number;
    public mapHeight: number;
    public tileSize: number;
    public zoom: number;
    public layers: PIXI.Container[];

    constructor(width: number, height: number, tileSize: number = 16) {
        super();

        this.mapWidth = width;
        this.mapHeight = height;
        this.tileSize = tileSize;
        this.zoom = 1;

        this.scale.x = this.scale.y = this.zoom;

        // Add base layer
        this.layers[0] = new PIXI.Container();
    }

    protected localToIndex(x: number, y: number): number {
        return x * this.mapHeight + y;
    }

    public addTile(x: number, y: number, textureName: string): void {
        let index = this.localToIndex(x, y);

        let tile = new Tile(textureName);
        tile.tileX = x;
        tile.tileY = y;
        tile.position.x = x * this.tileSize;
        tile.position.y = y * this.tileSize;

        this.layers[0].addChildAt(tile, index);
    }
}
