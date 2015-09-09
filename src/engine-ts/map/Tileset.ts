/// <reference path="../../../typings/pixi.js/pixi.js.d.ts" />

export interface ITiledTileset {
    firstgid: number;
    image: string;
    imageheight: number;
    imagewidth: number;
    name: string;
    tileheight: number;
    tilewidth: number;
    tilecount: number;
}

export default class Tileset {
    private tilesets: ITiledTileset[];

    constructor(tilesets: ITiledTileset[]) {
        this.tilesets = tilesets;
    }

    generateTextures(): void {
        // TODO: Deal with multiple tilesets!
        let tileset = this.tilesets[0];

        // TODO: Check this doesn't create a new texture - we want the baseTexture
        let tilesetTexture = PIXI.Texture.fromImage(tileset.image);

        let numTilesX = (tileset.imagewidth / tileset.tilewidth);
        let numTilesY = (tileset.imageheight / tileset.tileheight);

        for (let n = 0; n < tileset.tilecount; n++) {
            let id = n + tileset.firstgid;
            let name = tileset.image + "[" + id + "]";

            let x = n % numTilesX;
            let y = (n - x) / numTilesY;

            // TODO: Check that the texture not already in the cache
            let texture = new PIXI.Texture(
                tilesetTexture,
                new PIXI.Rectangle(x * tileset.tilewidth, y * tileset.tileheight, tileset.tilewidth, tileset.tileheight)
            );

            PIXI.Texture.addTextureToCache(texture, name);
        }

        console.log(PIXI.utils.TextureCache);
    }
}
