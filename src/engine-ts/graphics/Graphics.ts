/// <reference path="../../../typings/pixi.js/pixi.js.d.ts" />
// import PIXI from "pixi.js";

class Graphics {
    private renderer: PIXI.WebGLRenderer;
    private width: number;
    private height: number;

    public init(element: HTMLElement, width: number, height: number, options: PIXI.RendererOptions = {}): boolean {
        this.width = width;
        this.height = height;

        // We can only have one renderer
        if (this.renderer) {
            return false;
        }

        // Create the renderer
        this.renderer = new PIXI.WebGLRenderer(width, height, options);
        element.appendChild(this.renderer.view);
    }

    public render(scene: PIXI.DisplayObject): void {
        this.renderer.render(scene);
    }
}

export default new Graphics();
