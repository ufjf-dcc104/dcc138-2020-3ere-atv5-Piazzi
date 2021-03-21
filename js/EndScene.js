import Scene from "./Scene.js";

export default class EndScene extends Scene {
  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "20px Impact";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Game Over",
      this.canvas.width / 2,
      this.canvas.height / 2
    );

    this.ctx.fillText(
      "Your Score: "+this.score,
      this.canvas.width / 2,
      this.canvas.height / 2 + 40
    );

    if (this.assets.finished()) {
      this.ctx.fillText(
        "Press space to play again",
        this.canvas.width / 2,
        this.canvas.height / 2 + 80
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
