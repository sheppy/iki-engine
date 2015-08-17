/// <reference path="../../../typings/pixi.js/pixi.js.d.ts" />
import Scene from "./Scene";

class SceneManager {
    private stage: PIXI.Container;
    private scenes: Scene[];
    private currentScene: Scene;

    public init(): void {
        // Create the root of the scene graph
        this.stage = new PIXI.Container();
        this.scenes = [];
    }

    public addScene(id: string, scene: Scene): Scene {
        if (this.scenes[id]) {
            return null;
        }

        this.scenes[id] = scene;

        this.stage.addChild(scene);

        return scene;
    }


    /**
     * Create a new scene and add it.
     */
    public createScene(id: string, sceneClass: new() => Scene = Scene): Scene {
        return this.addScene(id, new sceneClass());
    }

    public getStage(): PIXI.Container {
        return this.stage;
    }

    public getCurrentScene(): Scene {
        return this.currentScene;
    }

    /**
     * Go to a scene.
     */
    public goToScene(id: string, data?: Object): boolean {
        if (!this.scenes[id]) {
            return false;
        }

        if (this.currentScene) {
            this.currentScene.deactivate(data);
        }

        this.currentScene = this.scenes[id];

        this.currentScene.activate(data);
        return true;
    }

    public showScene(id: string, data?: Object): boolean {
        if (!this.scenes[id]) {
            return false;
        }

        this.scenes[id].activate(data);
        return true;
    }

    public hideScene(id: string, data?: Object): boolean {
        if (!this.scenes[id]) {
            return false;
        }

        this.scenes[id].deactivate(data);
        return true;
    }

    public removeScene(id: string): boolean {
        if (!this.scenes[id]) {
            return false;
        }

        if (this.scenes[id].isActive()) {
            this.scenes[id].deactivate();
        }

        this.stage.addChild(this.scenes[id]);

        delete this.scenes[id];

        return true;
    }
}

export default new SceneManager();
