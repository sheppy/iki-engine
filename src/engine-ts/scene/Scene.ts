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
        // Implemented in subclass
    }

    public update(dt: number): void {
        // Implemented in subclass
    }

    public activate(data: Object = {}): void {
        this.active = true;
    }

    public deactivate(data: Object = {}): void {
        this.active = false;
    }

    public isActive(): boolean {
        return this.active;
    }
}
