import PIXI from "pixi.js";

let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * @class GFX
 */
export default class GFX {
    /**
     * @constructs GFX
     */
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw "Cannot construct singleton";
        }

        /**
         * @name GFX#renderer
         * @type {PIXI.WebGLRenderer}
         */
        this.renderer = null;
    }

    /**
     * @static
     * @returns {GFX}
     */
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new GFX(singletonEnforcer);
        }
        return this[singleton];
    }

    /**
     * @param {HTMLElement} element
     * @param {number} width
     * @param {number} height
     * @returns {boolean}
     */
    init(element, width, height) {
        this.width = width;
        this.height = height;

        // We can only have one renderer
        if (this.renderer) {
            return false;
        }

        // Create the renderer
        this.renderer = new PIXI.WebGLRenderer(width, height);
        element.appendChild(this.renderer.view);
    }

    /**
     * @param {Stage} stage
     */
    render(stage) {
        this.renderer.render(stage);
    }
}
