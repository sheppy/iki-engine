import PIXI from "pixi.js";

/**
 * @class Scene
 * @extends PIXI.Container
 */
export default class Scene extends PIXI.Container {

    /**
     * @constructs Scene
     */
    constructor() {
        super();

        /** @private */
        this.active = false;
        this.visible = false;

        this._init();
    }

    /**
     * @abstract
     * @protected
     */
    _init() {}

    /**
     * @abstract
     * @param {number} dt
     */
    update(dt) {}

    activate(data) {
        this.active = true;
        this._onActivate(data);
    }

    /**
     * @protected
     */
    _onActivate() {
        this.visible = true;
    }

    deactivate(data) {
        this.active = false;
        this._onDeactivate(data);
    }

    /**
     * @protected
     */
    _onDeactivate() {
        this.visible = false;
    }

    /**
     * @returns {boolean}
     */
    isActive() {
        return this.active;
    }
}
