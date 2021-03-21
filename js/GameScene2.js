import Map from "./Map.js";
import Scene from "./Scene.js";
import Sprite from "./Sprite.js";
import mapModel2 from "../maps/map2.js";

export default class GameScene2 extends Scene {
  onCollision(a, b) {
    // checa se chegou no portal para trocar de fase
    if (
      (a.tags.has("pc") && b.tags.has("portal")) ||
      (b.tags.has("pc") && a.tags.has("portal"))
    ) {
      this.game.selectScene("end");
      return;
    }

    // checa se coletou alguma moeda
    if (
      (a.tags.has("pc") && b.tags.has("coin")) ||
      (b.tags.has("pc") && a.tags.has("coin"))
    ) {
      if (!this.toRemove.includes(a) && a.tags.has("coin"))
        this.toRemove.push(a);
      if (!this.toRemove.includes(b) && b.tags.has("coin"))
        this.toRemove.push(b);
      this.assets.play("coin");
      document.getElementById("score").textContent = parseInt(document.getElementById("score").textContent) + 1;
      return;
    }

    if (!this.toRemove.includes(a)) this.toRemove.push(a);
    if (!this.toRemove.includes(b)) this.toRemove.push(b);

    if (a.tags.has("pc") && b.tags.has("enemy")) {
      this.game.selectScene("end");
    }

    this.assets.play("boom");
    console.log(this.toRemove);
  }

  prepare() {
    super.prepare();
    const map = new Map(10, 14, 32);
    map.loadMap(mapModel2);
    this.setsUpMap(map);
    //this.addRandomSprites(10);
    this.spawnSpriteEveryInterval(4000);
    const pc = new Sprite({ x: 50, y: 275 });
    pc.tags.add("pc");
    const scene = this;
    pc.control = function (dt) {
      if (scene.input.commands.get("MOVE_LEFT")) {
        this.vx = -150;
      } else if (scene.input.commands.get("MOVE_RIGHT")) {
        this.vx = +150;
      } else {
        this.vx = 0;
      }

      if (scene.input.commands.get("MOVE_UP")) {
        this.vy = -150;
      } else if (scene.input.commands.get("MOVE_DOWN")) {
        this.vy = +150;
      } else {
        this.vy = 0;
      }
    };
    this.add(pc);

    function chasePC(dt) {
      this.vx = 25 * Math.sign(pc.x - this.x);
      this.vy = 25 * Math.sign(pc.y - this.y);
    }

    const en1 = new Sprite({
      x: 360,
      color: "red",
      control: chasePC,
      tags: ["enemy"],
    });
    this.add(en1);

    this.add(
      new Sprite({
        x: 115,
        y: 70,
        vy: 10,
        color: "red",
        control: chasePC,
        tags: ["enemy"],
      })
    );
    this.add(
      new Sprite({
        x: 115,
        y: 160,
        vy: -10,
        color: "red",
        control: chasePC,
        tags: ["enemy"],
      })
    );

    this.add(
      new Sprite({
        x: 55,
        y: 160,
        color: "yellow",
        tags: ["coin"],
      })
    );

    this.add(
      new Sprite({
        x: 345,
        y: 60,
        color: "yellow",
        tags: ["coin"],
      })
    );

    this.add(
      new Sprite({
        x: 275,
        y: 260,
        color: "yellow",
        tags: ["coin"],
      })
    );

    this.add(
      new Sprite({
        x: 400,
        y: 250,
        color: "blue",
        tags: ["portal"],
      })
    );
  }
}
