import PIXI from "pixi.js";
import Scene from "./Scene";

let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * @class SceneManager
 * @requires Scene
 */
export default class SceneManager {
    /**
     * @constructs SceneManager
     */
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw "Cannot construct singleton";
        }

        /**
         * @name SceneManager#stage
         * @type {PIXI.Stage}
         */
        this.stage = null;

        /**
         * List of available scenes.
         *
         * @name SceneManager#scenes
         * @type {{Scene}}
         */
        this.scenes = {};

        /**
         * Current scene.
         *
         * @name SceneManager#currentScene
         * @type {Scene}
         */
        this.currentScene = null;
    }

    /**
     * @static
     * @returns {SceneManager}
     */
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new SceneManager(singletonEnforcer);
        }
        return this[singleton];
    }

    /**
     * @param {number} [background=0x000000] - The background color to use for the stage.
     * @param {boolean} [interactive=true]
     */
    init(background = 0x000000, interactive = true) {
        this.stage = new PIXI.Stage(background, interactive);
    }

    /**
     * Add existing scene.
     *
     * @param {string} id - Scene id.
     * @param {Scene} scene - Scene to add.
     * @returns {Scene} The scene that was added.
     */
    addScene(id, scene) {
        if (this.scenes[id]) {
            return null;
        }

        this.scenes[id] = scene;

        this.stage.addChild(scene);

        return scene;
    }

    /**
     * Create a new scene and add it.
     *
     * @param {string} id - Scene id.
     * @param {function(new:Scene)=} [SceneClass=Scene] - The type of scene to create.
     * @returns {Scene} The newly created scene.
     */
    createScene(id, SceneClass = Scene) {
        /**
         * @type {Scene}
         */
        let scene = new SceneClass();

        return this.addScene(id, scene);
    }

    /**
     * Go to a scene.
     *
     * @param {string} id - Scene id.
     * @param data
     * @returns {boolean} If the scene was found.
     */
    goToScene(id, data) {
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

    showScene(id, data) {
        if (!this.scenes[id]) {
            return false;
        }

        this.scenes[id].activate(data);
        return true;
    }

    hideScene(id, data) {
        if (!this.scenes[id]) {
            return false;
        }

        this.scenes[id].deactivate(data);
        return true;
    }

    removeScene(id) {
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
