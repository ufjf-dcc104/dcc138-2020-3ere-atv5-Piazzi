import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import GameScene from "./GameScene.js";
import GameScene2 from "./GameScene2.js";
import LoadingScene from "./LoadingScene.js";
import EndScene from "./EndScene.js";
import FinalScene from "./FinalScene.js";


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
assets.loadAudio("portal", "assets/portal.wav");
assets.loadAudio("music", "assets/music.mp3");



const canvas = document.querySelector("canvas");
canvas.width = 14 * 32;
canvas.height = 10 * 32;

input.configureKeyboard({
  ArrowLeft: "MOVE_LEFT",
  ArrowRight: "MOVE_RIGHT",
  ArrowUp: "MOVE_UP",
  ArrowDown: "MOVE_DOWN",
  " ": "NEXT_SCENE",

});

const game = new Game(canvas, assets, input);

const scene0 = new LoadingScene();
const scene1 = new GameScene();
const scene2 = new GameScene2();
const scene3 = new EndScene();
const scene4 = new FinalScene();



game.addScene("loading", scene0);
game.addScene("game", scene1);
game.addScene("game2", scene2);
game.addScene("end", scene3);
game.addScene("final", scene4);




game.start();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      game.start();
      break;
    case "S":
      game.stop();
      break;
    case "c":
      assets.play("coin");
      break;
    case "b":
      assets.play("boom");
      break;
  }
});
