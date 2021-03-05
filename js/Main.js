import AssetManager from "./AssetManager.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";

const img1 = new Image();
img1.src = "assets/garota.png";

const img2 = new Image();
img2.src = "assets/skelly.png";

const img3 = new Image();
img3.src = "assets/orc.png";

document.body.appendChild(img1);
document.body.appendChild(img2);
document.body.appendChild(img3);

const assets = new AssetManager();

const canvas = document.querySelector("canvas");
const scene1 = new Scene(canvas, assets);
const pc = new Sprite({vx: 10});
const en1 = new Sprite({x:140, w:30, color:"red"});


scene1.add(pc);
scene1.add(en1);
scene1.add(new Sprite({y:40, w:30, color:"red"}))

scene1.start();


document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "s":
            scene1.start();
            break;
        case "S":
            scene1.stop();
            break;
    }
})
