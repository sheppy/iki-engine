/// <reference path="../../../typings/pixi.js/pixi.js.d.ts" />

interface IAsset {
    name: string;
    url: string;
}

class AssetManager {
    private assetQueue: IAsset[] = [];

    addImage(name: string, url: string): void {
        if (!url) {
            url = name;
        }

        this.assetQueue.push({name: name, url: url});
    }

    load(onComplete: Function, onProgress: Function): void {
        //let loader = new PIXI.JsonLoader(url);
        // Load images
        let loader = new PIXI.loaders.Loader();

        this.assetQueue.forEach(function (image: IAsset): void {
            loader.add(image.name, image.url);
        });

        // Clear current queue
        this.assetQueue = [];

        if (onComplete) {
            loader.on("complete", onComplete);
        }

        if (onProgress) {
            loader.on("progress", onProgress);
        }

        loader.load();
    }
}

export default new AssetManager();
