/// <reference path="../../typings/pixi.js/pixi.js.d.ts" />
import Scene from "../../src/engine-ts/scene/Scene";
import TileMap from "../../src/engine-ts/map/TileMap";
import TileMapLighting from "../../src/engine-ts/map/TileMapLighting";
import AssetManager from "../../src/engine-ts/asset/AssetManager";

export default class MapScene extends Scene {
    map:TileMap;

    protected init(): void {
        this.map = TileMapLighting.createFromJson(AssetManager.get("map.json"));

        this.addChild(this.map);
    }

    public activate(data: Object = {}): void {
        super.activate(data);
    }
}
