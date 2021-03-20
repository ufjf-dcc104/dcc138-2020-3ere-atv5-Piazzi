import Scene from "./Scene.js";

export default class LoadingScene extends Scene {
  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "20px Impact";
    this.ctx.fillStyle = "yellow";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      this.assets?.progress(),
      this.canvas.width / 2,
      this.canvas.height / 2
    );

    if (this.assets.finished()) {
      this.ctx.fillText(
        "Press space to continue",
        this.canvas.width / 2,
        this.canvas.height / 2 + 40
      );
    }
  }

  frame(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;

    if (this.assets.finished() && this.input.commands.get("NEXT_SCENE")) {
      this.game.selectScene("game");
      return;
    }
    this.draw();
    this.start();
    this.t0 = t;
  }
}
