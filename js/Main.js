import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");
const scene1 = new Scene(canvas);
const pc = new Sprite({});
const en1 = new Sprite({x:140, w:30, color:"red"});


scene1.add(pc);
scene1.add(en1);

scene1.step(0.16);
scene1.draw();

