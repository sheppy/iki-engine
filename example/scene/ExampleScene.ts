/// <reference path="../../typings/pixi.js/pixi.js.d.ts" />
import Scene from "../../src/engine-ts/scene/Scene";

export default class ExampleScene extends Scene {
    protected init(): void {
        console.log("ExampleScene:init");
    }

    public onActivate(data: Object): void {
        super.onActivate(data);

        let img = PIXI.Sprite.fromImage("http://s.w.org/images/core/emoji/72x72/1f609.png");
        img.anchor.x = 0.5;
        img.anchor.y = 0.5;
        img.position.x = 50;
        img.position.y = 50;
        this.addChild(img);
    }
}
