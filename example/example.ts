/// <reference path="../typings/pixi.js/pixi.js.d.ts" />

import Game from "../src/engine-ts/game/Game";
import Graphics from "../src/engine-ts/graphics/Graphics";
import SceneManager from "../src/engine-ts/scene/SceneManager";

import BootstrapScene from "./scene/BootstrapScene";

// Pixel art scaling
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

// Initialise the graphics
Graphics.init(document.body, 800, 600);

let game = new Game();
game.run();


// Create scenes
SceneManager.init();
SceneManager.createScene("bootstrap", BootstrapScene);
SceneManager.goToScene("bootstrap");

