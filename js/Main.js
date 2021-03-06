import AssetManager from "./AssetManager.js";
import Map from "./Map.js";
import Mixer from "./Mixer.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";
import mapModel1 from "../maps/map1.js";

const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.loadImage("garota", "assets/garota.png");
assets.loadImage("esqueleto", "assets/skelly.png");
assets.loadImage("orc", "assets/orc.png");
assets.loadAudio("coin", "assets/coin.wav");
assets.loadAudio("boom", "assets/boom.wav");


const canvas = document.querySelector("canvas");
canvas.width = 14*32;
canvas.height = 10*32;
const scene1 = new Scene(canvas, assets);

const map1 = new Map(10, 14, 32);
map1.loadMap(mapModel1);
scene1.setsUpMap(map1);

const pc = new Sprite({ x: 50, vx: 10 });
const en1 = new Sprite({ x: 140,  color: "red" });

scene1.add(pc);
scene1.add(en1);
scene1.add(new Sprite({ y: 70,  color: "red" }));

scene1.start();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      scene1.start();
      break;
    case "S":
      scene1.stop();
      break;
    case "c":
      assets.play("coin");
      break;
    case "b":
      assets.play("boom");
      break;
  }
});
