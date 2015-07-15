import { Scene, Tile, TileMap } from "../../src/engine/index";

/**
 * @class
 * @extends Scene
 */
export default class PrototypeMapScene extends Scene {
    initMap() {
        //this.map = new TileMap();

        this.map = new Tile(2);

        this.addChild(this.map);
    }

    renderMap() {
        this.map.renderTilesToSprite();
    }

    _onActivate() {
        super._onActivate();

        this.initMap();
        //this.map.generate();
        //this.renderMap();
    }
}
