/// <reference path="../../../typings/pixi.js/pixi.js.d.ts" />

export default class Scene extends PIXI.Container {
    private active: boolean;

    constructor() {
        super();

        this.active = false;
        this.visible = false;

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
        this.visible = true;
    }

    public deactivate(data: Object = {}): void {
        this.active = false;
        this.visible = false;
    }

    public isActive(): boolean {
        return this.active;
    }
}
