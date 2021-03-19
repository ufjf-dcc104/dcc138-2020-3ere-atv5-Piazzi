import AssetManager from "./AssetManager.js";
import Map from "./Map.js";
import Mixer from "./Mixer.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";
import mapModel1 from "../maps/map1.js";
import InputManager from "./InputManager.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.loadImage("ground", "assets/ground.png");
assets.loadImage("lava", "assets/lava.png");
assets.loadImage("wall", "assets/wall.png");

assets.loadImage("garota", "assets/garota.png");
assets.loadImage("esqueleto", "assets/skelly.png");
assets.loadImage("orc", "assets/orc.png");
assets.loadAudio("coin", "assets/coin.wav");
assets.loadAudio("boom", "assets/boom.wav");

const canvas = document.querySelector("canvas");
canvas.width = 14 * 32;
canvas.height = 10 * 32;

input.configureKeyboard({
  ArrowLeft: "MOVE_LEFT",
  ArrowRight: "MOVE_RIGHT",
  ArrowUp: "MOVE_UP",
  ArrowDown: "MOVE_DOWN",

});

const scene1 = new Scene(canvas, assets);

const map1 = new Map(10, 14, 32);
map1.loadMap(mapModel1);
scene1.setsUpMap(map1);

const pc = new Sprite({ x: 50, y: 275 });
pc.control = function (dt) {
  if (input.commands.get("MOVE_LEFT")) {
    this.vx = -50;
  } else if (input.commands.get("MOVE_RIGHT")) {
    this.vx = +50;
  } else {
    this.vx = 0;
  }

  if (input.commands.get("MOVE_UP")) {
    this.vy = -50;
  } else if (input.commands.get("MOVE_DOWN")) {
    this.vy = +50;
  } else {
    this.vy = 0;
  }
};
const en1 = new Sprite({ x: 160, vx: -10, color: "red" });

scene1.add(pc);
scene1.add(en1);
scene1.add(new Sprite({ x: 115, y: 70, vy: 10, color: "red" }));
scene1.add(new Sprite({ x: 115, y: 160, vy: -10, color: "red" }));
scene1.addRandomSprites(10);
scene1.spawnSpriteEveryInterval(4000);

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
