/// <reference path="../../typings/pixi.js/pixi.js.d.ts" />
import Scene from "../../src/engine-ts/scene/Scene";

export default class ExampleScene extends Scene {
    img: PIXI.Sprite;

    protected init(): void {
        // Add our image
        this.img = PIXI.Sprite.fromImage("/null.png");
        this.addChild(this.img);
    }

    public activate(data: Object = {}): void {
        super.activate(data);

        // Set defaults
        this.img.anchor.x = 0.5;
        this.img.anchor.y = 0.5;
        this.img.position.x = 50;
        this.img.position.y = 50;
        this.img.rotation  = 0;
    }

    public update(dt: number): void {
        if (dt === 0) {
            return;
        }

        let seconds = 2;
        dt = dt / 1000;

        let rotation = ((Math.PI * 2) / seconds) * dt;
        console.log(rotation);

        this.img.rotation += rotation;
    }
}
