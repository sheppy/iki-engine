import PIXI from "pixi.js";

let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * @class AssetManager
 * @public
 */
export default class AssetManager {
    /**
     * @constructs AssetManager
     */
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw "Cannot construct singleton";
        }

        /**
         * @name AssetManager#_assetQueue
         * @type {Array}
         */
        this._assetQueue = [];
    }

    /**
     * @static
     * @returns {AssetManager}
     */
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new AssetManager(singletonEnforcer);
        }
        return this[singleton];
    }

    /**
     * @param {String} name
     * @param {String} url
     */
    addImage(name, url) {
        if (!url) {
            url = name;
        }

        this._assetQueue.push({ name, url });
    }

    /**
     * @param {function=} onComplete
     * @param {function=} onProgress
     */
    load(onComplete, onProgress) {
        //var loader = new PIXI.JsonLoader(url);
        // Load images
        let loader = new PIXI.loaders.Loader();

        this._assetQueue.forEach(function (image) {
            loader.add(image.name, image.url);
        });

        // Clear current queue
        this._assetQueue = [];

        if (onComplete) {
            loader.on("complete", onComplete);
        }

        if (onProgress) {
            loader.on("progress", onProgress);
        }

        loader.load();
    }
}
