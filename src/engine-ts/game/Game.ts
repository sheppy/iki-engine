import Graphics from "../graphics/Graphics";
import FpsMeter from "../graphics/FpsMeter";
import SceneManager from "../Scene/SceneManager";

export default class Game {
    skipTicks: number;
    nextUpdateTick: number;
    lastTime: number;
    fps: FpsMeter;
    ups: FpsMeter;

    constructor() {
        this.skipTicks = 1000 / 120;
        this.nextUpdateTick = Date.now();
        this.lastTime = Date.now();

        this.fps = new FpsMeter();

        this.ups = new FpsMeter({
            right: "5px",
            left: "auto"
        });
    }

    public run(): void {
        window.requestAnimationFrame(this.run.bind(this));

        let currentTime, dt, loops = 0;

        while ((currentTime = Date.now()) > this.nextUpdateTick) {
            dt = currentTime - this.lastTime;
            this.lastTime = currentTime;
            this.update(dt);
            this.nextUpdateTick += this.skipTicks;
            loops++;
        }

        // If we actually updated anything
        if (loops) {
            this.render();
        }
    }

    private update(dt: number): void {
        this.ups.tick();

        // Get current scene & update
        let scene = SceneManager.getCurrentScene();

        if (scene) {
            scene.update(dt);
        }
    }

    private render(): void {
        this.fps.tick();

        if (SceneManager.getStage()) {
            Graphics.render(SceneManager.getStage());
        }
    }
}
