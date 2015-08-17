import Point from "../src/engine-ts/shape/Point";
import Line from "../src/engine-ts/shape/Line";

let start: Point = new Point(5, 5);
let end: Point = new Point(0, 0);

let line: Line = new Line(start, end);

//let line:Line = new Line({x: 0, y: 0}, {x: 0, y: 0});

console.log("Length", line.length);

