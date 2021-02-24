import Scene from "./Scene.js";

console.log('hello');

const canvas = document.querySelector("canvas");
console.log(canvas);

const scene1 = new Scene(canvas);
scene1.draw();