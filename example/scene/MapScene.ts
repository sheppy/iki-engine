/// <reference path="../../typings/pixi.js/pixi.js.d.ts" />
import Scene from "../../src/engine-ts/scene/Scene";
import Tile from "../../src/engine-ts/map/Tile";

export default class MapScene extends Scene {
    protected init(): void {
        this.addChild(new Tile("ocean.png"));
    }

    public activate(data: Object = {}): void {
        super.activate(data);
    }
}
