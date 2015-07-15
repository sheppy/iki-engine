import PIXI from "pixi.js";

// Prevent fuzzy scaling on pixels
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

import GFX from "../src/engine/graphic/GFX";
import Game from "../src/engine/core/Game";
import SceneManager from "../src/engine/scene/SceneManager";

import BootstrapScene from "./scene/BootstrapScene";

// Initialise the graphics
GFX.instance.init(document.body, 800, 600);

// Create and run the game
var game = new Game();
game.run();

// Create scenes
SceneManager.instance.init();
SceneManager.instance.createScene("bootstrap", BootstrapScene);
SceneManager.instance.goToScene("bootstrap");
