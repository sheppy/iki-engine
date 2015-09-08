/// <reference path="../../../typings/pixi.js/pixi.js.d.ts" />

interface IAsset {
    name: string;
    url: string;
}

class AssetManager {
    private assetQueue: IAsset[] = [];

    public add(name: string, url: string = ""): void {
        if (!url) {
            url = name;
        }

        this.assetQueue.push({name: name, url: url});
    }

    public load(onComplete: Function, onProgress: Function): void {
        let loader = new PIXI.loaders.Loader();

        this.assetQueue.forEach(function (image: IAsset): void {
            loader.add(image);
        });

        // Clear current queue
        this.assetQueue = [];

        loader.on("complete", onComplete);

        if (onProgress) {
            loader.on("progress", onProgress);
        }

        loader.load();
    }
}

export default new AssetManager();
