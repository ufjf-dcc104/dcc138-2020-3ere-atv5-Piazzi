import AssetManager from "./AssetManager.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const assets = new AssetManager();

assets.loadImage("garota", "assets/garota.png");
assets.loadImage("esqueleto", "assets/skelly.png");
assets.loadImage("orc", "assets/orc.png");
assets.loadAudio("coin", "assets/coin.wav");
assets.loadAudio("boom", "assets/boom.wav");

const canvas = document.querySelector("canvas");
const scene1 = new Scene(canvas, assets);
const pc = new Sprite({ vx: 10 });
const en1 = new Sprite({ x: 140, w: 30, color: "red" });

scene1.add(pc);
scene1.add(en1);
scene1.add(new Sprite({ y: 40, w: 30, color: "red" }));

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
      assets.audio("coin").play();
      break;
    case "b":
      assets.audio("boom").play();
      break;
  }
});
