import Line from "../src/engine-ts/shape/Line";

let line: Line = new Line(5, 5, 0, 0);

console.log("Length", line.length);







//--------------

import Game from "../src/engine-ts/game/Game";
import Graphics from "../src/engine-ts/graphics/Graphics";
import SceneManager from "../src/engine-ts/scene/SceneManager";
import ExampleScene from "./scene/ExampleScene";

// Initialise the graphics
Graphics.init(document.body, 800, 600);

let game = new Game();
game.run();


// Create scenes
SceneManager.init();
SceneManager.createScene("example", ExampleScene);
SceneManager.goToScene("example");

//let exampleScene = new ExampleScene();

