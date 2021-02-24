export default class Scene {
    // É responsável por desenhar elementos na tela 
    // em um animação.
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    draw(){
        this.fillStyle = "blue";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}