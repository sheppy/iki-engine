import Point from "../src/engine-ts/Point";
import Line from "../src/engine-ts/Line";
import Singleton from "../src/engine-ts/Singleton";

let start: Point = new Point(5, 5);
let end: Point = new Point(0, 0);

let line: Line = new Line(start, end);

//let line:Line = new Line({x: 0, y: 0}, {x: 0, y: 0});

console.log("Length", line.length);

