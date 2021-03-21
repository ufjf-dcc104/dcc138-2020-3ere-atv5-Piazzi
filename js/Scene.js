import Sprite from "./Sprite.js";

export default class Scene {
  /* 
        É responsável por desenhar elementos na tela 
       em uma animação.
    */
  constructor(canvas = null, assets = null) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext("2d");
    this.assets = assets;
    this.sprites = [];
    this.game = null;
    this.score = 0;
    this.prepare();
  }

  draw() {
    this.ctx.fillStyle = "lightblue";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.map?.draw(this.ctx);

    if (this.assets.finished()) {
      for (let s = 0; s < this.sprites.length; s++) {
        const sprite = this.sprites[s];
        sprite.draw(this.ctx);
        sprite.appliesRestrictions();
      }
    }

    //this.ctx.fillStyle = "yellow";
    //this.ctx.fillText(this.assets?.progress(), 10, 20);
    //this.ctx.fillText("Score: " + this.score,40,20);
  }

  add(sprite) {
    sprite.scene = this;
    this.sprites.push(sprite);
  }

  step(dt) {
    if (this.assets.finished) {
      for (const sprite of this.sprites) {
        sprite.step(dt);
      }
    }
  }

  frame(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;

    this.step(this.dt);
    this.draw();
    this.checkCollision();
    this.removeSprites();

    if(this.running)
      this.start();
    this.t0 = t;
  }

  start() {
    this.running = true;
    this.idAnim = requestAnimationFrame((t) => {
      this.frame(t);
    });
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.idAnim);
    this.t0 = null;
    this.dt = 0;
  }

  checkCollision() {
    for (let a = 0; a < this.sprites.length - 1; a++) {
      const spriteA = this.sprites[a];
      for (let b = a + 1; b < this.sprites.length; b++) {
        const spriteB = this.sprites[b];
        if (spriteA.collidedWith(spriteB)) 
          this.onCollision(spriteA, spriteB);
      }
    }
  }

  onCollision(a, b) {
    if (!this.toRemove.includes(a)) 
      this.toRemove.push(a);
    if (!this.toRemove.includes(b)) 
      this.toRemove.push(b);

    this.assets.play("boom");  
    console.log(this.toRemove);
  }

  removeSprites() {
    for (const target of this.toRemove) {
      const idx = this.sprites.indexOf(target);
      if (idx >= 0) {
        this.sprites.splice(idx, 1);
      }
    }
    this.toRemove = [];
  }

  setsUpMap(map) {
    this.map = map;
    this.map.scene = this;
  }

  createRandomSprites(num = 1) {
    let sprites = [];
    for (let i = 0; i < num; i++) {
      let sprite = new Sprite({
        x: this.getRandomInt(40, 400),
        y: this.getRandomInt(50, 275),
        vx: this.getRandomInt(-10, 10),
        vy: this.getRandomInt(-10, 10),
        color: this.getRandomColor(),
        tags: ["enemy"],
      });
      sprites.push(sprite);
    }
    return sprites;
  }

  addRandomSprites(num)
  {
    let sprites = this.createRandomSprites(num);
    for (let i = 0; i < sprites.length; i++) {
      this.add(sprites[i]);
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // interval in milliseconds
  spawnSpriteEveryInterval(interval){
    setInterval(() => {
      this.addRandomSprites(1);
    }, interval);
  
  }

  prepare(){
    this.sprites = [];
    this.toRemove = [];
    this.t0 = null;
    this.dt = 0;
    this.idAnim = null;
    this.map = null;
    this.running = true;
  }

  updateScore(){
    document.getElementById("score").textContent = parseInt(document.getElementById("score").textContent) + 1;
  }
}
