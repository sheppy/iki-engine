/// <reference path="../../../typings/pixi.js/pixi.js.d.ts" />

import Tile from "./Tile";
import Tileset from "./Tileset";
import {ITiledTileset} from "./Tileset";

export interface ITiledMapObject {
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
    properties: Object;
}

export interface ITiledMapLayer {
    data: number[];
    type: string;
    name: string;
    visible: boolean;
    objects: ITiledMapObject[];
}

export interface ITiledMap {
    width: number;
    height: number;
    tilewidth: number;
    tileheight: number;
    layers: ITiledMapLayer[];
    tilesets: ITiledTileset[];
    properties: Object;
}

export class TileMap extends PIXI.Container {
    public mapWidth: number;
    public mapHeight: number;
    public tileSize: number;
    public zoom: number;
    public tileset: Tileset;
    public objects: ITiledMapObject[][];

    constructor(width: number, height: number, tileSize: number = 16) {
        super();

        this.mapWidth = width;
        this.mapHeight = height;
        this.tileSize = tileSize;
        this.zoom = 1;
        this.objects = [];

        this.scale.x = this.scale.y = this.zoom;
    }

    protected static create(width:number, height:number, tileSize:number = 16):TileMap {
        return new TileMap(width, height, tileSize);
    }

    static createFromJson(json: Object): TileMap {
        let tiled = <ITiledMap> json;
        let map = this.create(tiled.width, tiled.height, tiled.tilewidth);

        // Create textures from tileset
        map.tileset = new Tileset(tiled.tilesets);
        map.tileset.generateTextures();

        map.preCreate(tiled);

        for (let i = 0, j = tiled.layers.length; i < j; i++) {
            let layerData = tiled.layers[i];

            if (layerData.type === "tilelayer") {
                map.createTileLayer(layerData.data);
            }

            if (layerData.type === "objectgroup") {
                map.createObjectGroup(layerData.name, layerData.objects);
            }
        }

        map.postCreate(tiled);

        return map;
    }

    protected createTileLayer(data) {
        let layer:PIXI.Container = new PIXI.Container();
        this.addChild(layer);

        for (let n = 0, m = this.mapWidth * this.mapHeight; n < m; n++) {
            let textureName:string = null;
            if (data[n] > 0) {
                textureName = "tiles.png[" + data[n] + "]";
            }
            this.addTile(layer, n, textureName);
        }
    }

    protected createObjectGroup(name: string, objects:ITiledMapObject[]) {
        if (!this.objects[name]) {
            this.objects[name] = objects;
        }
    }

    protected localToIndex(x: number, y: number): number {
        return y * this.mapWidth + x;
    }

    public addTile(layer: PIXI.Container, index: number, textureName: string): void {
        let x = index % this.mapWidth;
        let y = (index - x) / this.mapHeight;

        let tile = new Tile(textureName);
        tile.tileX = x;
        tile.tileY = y;
        tile.position.x = x * this.tileSize;
        tile.position.y = y * this.tileSize;

        this.initTile(tile);

        // console.log("add >", x, y, tile.position.x, tile.position.y, textureName);
        layer.addChildAt(tile, index);
    }

    protected getTilesAt(x: number, y: number): Tile[] {
        let index = this.localToIndex(x, y);
        let tiles:Tile[] = [];

        for (let layer of this.children) {
            let theLayer:PIXI.Container = <PIXI.Container>layer;
            let tile:Tile = <Tile>theLayer.getChildAt(index);
            if (tile) {
                tiles.push(tile);
            }
        }

        return tiles;
    }

    protected preCreate(data:ITiledMap):void {}
    protected postCreate(data:ITiledMap):void {}

    protected initTile(tile:Tile):void {}
}

export default TileMap;
