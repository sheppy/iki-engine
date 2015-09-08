/// <reference path="../../typings/pixi.js/pixi.js.d.ts" />
import Scene from "../../src/engine-ts/scene/Scene";
import AssetManager from "../../src/engine-ts/asset/AssetManager";
import SceneManager from "../../src/engine-ts/scene/SceneManager";

// TODO: Better way for scenes?
import ExampleScene from "./ExampleScene";

export default class BootstrapScene extends Scene {
    loadingText: PIXI.Text;

    protected init(): void {
        // Display loading message
        this.loadingText = new PIXI.Text("Loading...", {font: "20px Arial", fill: "#fff"});
        this.addChild(this.loadingText);
    }

    public activate(data: Object = {}): void {
        super.activate(data);
        this.loadAssets();
    }

    public deactivate(data: Object = {}): void {
        super.deactivate(data);

        // Destroy ourselves as we are only needed once
        SceneManager.removeScene("bootstrap");
    }

    protected loadAssets(): void {
        // TODO: Load from json file
        AssetManager.addImage("null", "/null.png");
        AssetManager.load(this.onAssetsLoaded.bind(this), this.onAssetLoad.bind(this));
    }

    protected onAssetLoad(loader: PIXI.loaders.Loader): void {
        // Update asset text
        this.loadingText.text = "Loading... " + loader.progress + "%";
    }

    protected onAssetsLoaded(): void {
        console.log("Assets have been loaded");

        // Change scene
        SceneManager.createScene("example", ExampleScene);
        SceneManager.goToScene("example");
    }
}
