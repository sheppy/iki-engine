import PIXI from "pixi.js";
import Tile from "./Tile";

/**
 * @class TileMap
 * @extends PIXI.Container
 */
export default class TileMap extends PIXI.Container {
    /**
     * @constructs TileMap
     * @param {number} width - Width of map in tiles
     * @param {number} height - Height of map in tiles
     * @param {number} [tileSize=16] - Size of tiles in pixels
     */
    constructor(width, height, tileSize = 16) {
        super();

        /**
         * The width of the map in tiles.
         *
         * @name TileMap#mapWidth
         * @type {number}
         */
        this.mapWidth = width;

        /**
         * The height of the map in tiles.
         *
         * @name TileMap#mapHeight
         * @type {number}
         */
        this.mapHeight = height;

        /**
         * The width and height of a tile.
         *
         * @name TileMap#tileSize
         * @type {number}
         */
        this.tileSize = tileSize;

        /**
         * @name TileMap#baseTiles
         * @type {PIXI.Container}
         */
        this.baseTiles = new PIXI.Container();

        /**
         * @name TileMap#baseTileSprite
         * @type {PIXI.Sprite}
         */
        this.baseTileSprite = PIXI.Sprite.fromImage("null.png");
        this.addChild(this.baseTileSprite);
    }

    // Render the tilemap to a render texture
    renderTilesToSprite() {
        let textureWidth = this.mapWidth * this.tileSize;
        let textureHeight = this.mapHeight * this.tileSize;
        let baseTexture = new PIXI.RenderTexture(textureWidth, textureHeight);
        baseTexture.render(this.baseTiles);
        this.baseTileSprite.setTexture(baseTexture);
    }

    /**
     * Convert local map x/y to an one dimensional array index.
     *
     * @param {number} x
     * @param {number} y
     * @returns {number}
     * @private
     */
    _localToIndex(x, y) {
        return x * this.mapHeight + y;
    }

    generate() {
        for (let x = 0; x < this.mapWidth; x++) {
            for (let y = 0; y < this.mapHeight; y++) {
                this.addTile(x, y, 2);
            }
        }
    }

    /**
     * Add a tile to the map.
     *
     * @param x
     * @param y
     * @param textureName
     */
    addTile(x, y, textureName) {
        let index = this._localToIndex(x, y);

        let tile = new Tile(textureName);
        tile.tileX = x;
        tile.tileY = y;
        tile.position.x = x * this.tileSize;
        tile.position.y = y * this.tileSize;

        this.baseTiles.addChildAt(tile, index);
    }

    // Note: This removes the tile instance, it might be better to just change its properties
    changeTile(x, y, textureName, update) {
        this.baseTiles.removeChild(this.getTile(x, y));
        this.addTile(x, y, textureName);
        if (update) {
            this.renderTilesToSprite();
        }
    }

    getTile(x, y) {
        return this.baseTiles.getChildAt(this._localToIndex(x, y));
    }
}

export default TileMap;
