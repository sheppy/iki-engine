/// <reference path="../../../typings/pixi.js/pixi.js.d.ts" />
//import PIXI from "pixi.js";

export default class Scene extends PIXI.Container {
    private active: boolean;
    private sceneVisible: boolean;

    constructor() {
        super();

        this.active = false;
        this.sceneVisible = false;

        this.init();
    }

    protected init(): void {
        throw new Error("Method not implemented");
    }

    public update(dt: number): void {
        throw new Error("Method not implemented");
    }

    public activate(data: Object = {}): void {
        this.active = true;
        this.onActivate(data);
    }

    protected onActivate(data: Object = {}): void {
        this.sceneVisible = true;
    }

    public deactivate(data: Object = {}): void {
        this.active = false;
        this.onDeactivate(data);
    }

    protected onDeactivate(data: Object = {}): void {
        this.sceneVisible = false;
    }

    public isActive(): boolean {
        return this.active;
    }
}
