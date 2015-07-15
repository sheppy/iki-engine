import GFX from "./../graphic/GFX";
import SceneManager from "./../scene/SceneManager";
import FpsMeter from "./../graphic/FpsMeter";

/**
 * @class Game
 * @requires SceneManager
 */
export default class Game {
    /**
     * @constructs Game
     */
    constructor() {
        this.skipTicks = 1000 / 120;
        this.nextUpdateTick = Date.now();
        this.lastTime = Date.now();

        this.fps = new FpsMeter({
            heat: 1,
            graph: 1,
            top: "auto",
            bottom: "5px"
        });

        this.ups = new FpsMeter({
            heat: 1,
            graph: 1,
            top: "auto",
            bottom: "5px",
            right: "5px",
            left: "auto"
        });
    }

    /**
     * @param {number} dt
     * @private
     */
    _update(dt) {
        this.ups.tick();

        // Get current scene & update
        var scene = SceneManager.instance.currentScene;

        if (scene) {
            scene.update(dt);
        }
    }

    /**
     * @private
     */
    _render() {
        this.fps.tick();

        if (SceneManager.instance.stage) {
            GFX.instance.render(SceneManager.instance.stage);
        }
    }

    run() {
        window.requestAnimationFrame(this.run.bind(this));

        let currentTime, dt, loops = 0;

        while ((currentTime = Date.now()) > this.nextUpdateTick) {
            dt = currentTime - this.lastTime;
            this.lastTime = currentTime;
            this._update(dt);
            this.nextUpdateTick += this.skipTicks;
            loops++;
        }

        // If we actually updated anything
        if (loops) {
            this._render();
        }
    }
}
