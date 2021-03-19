export default class Sprite {
    /*
        É responsável por modelar algo que se move na tela.
     */
    constructor({x = 100, y = 100, vx = 0, vy = 0, control = () => {}, w = 20, h = 20, color = "white"} = {}){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.w = w;
        this.h = h;
        this.color = color;
        this.scene = null;
        this.mx = 0;
        this.my = 0;
        this.control = control
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
        ctx.strokeStyle = "blue";
        ctx.strokeRect(this.mx*this.scene.map.SIZE, this.my*this.scene.map.SIZE, this.scene.map.SIZE, this.scene.map.SIZE);

    }

    control(dt){

    }

    move(dt){
        this.x = this.x + this.vx*dt;
        this.y = this.y + this.vy*dt;
        this.mx = Math.floor(this.x / this.scene.map.SIZE);
        this.my = Math.floor(this.y / this.scene.map.SIZE);
    }

    step(dt){
       this.control(dt);
       this.move(dt);
    }

    collidedWith(anotherSprite){
        return !((
               this.x - this.w/2 > anotherSprite.x + anotherSprite.w/2)
            ||(this.x + this.w/2 < anotherSprite.x - anotherSprite.w/2)
            ||(this.y - this.h/2> anotherSprite.y + anotherSprite.h/2)
            ||(this.y + this.h/2 < anotherSprite.y - anotherSprite.h/2)
        );
    }

    appliesRestrictions(dt){

        this.appliesRightRestrictions(this.mx + 1, this.my - 1);
        this.appliesRightRestrictions(this.mx + 1, this.my);
        this.appliesRightRestrictions(this.mx + 1, this.my + 1); 

        this.appliesLeftRestrictions(this.mx - 1, this.my - 1);
        this.appliesLeftRestrictions(this.mx - 1, this.my);
        this.appliesLeftRestrictions(this.mx - 1, this.my + 1);

        this.appliesLowRestrictions(this.mx - 1, this.my + 1);
        this.appliesLowRestrictions(this.mx, this.my + 1);
        this.appliesLowRestrictions(this.mx + 1, this.my + 1);

        this.appliesUpRestrictions(this.mx - 1, this.my - 1);
        this.appliesUpRestrictions(this.mx, this.my - 1);
        this.appliesUpRestrictions(this.mx + 1, this.my - 1);

    }

    appliesRightRestrictions(pmx, pmy){
        const SIZE = this.scene.map.SIZE;
        if(this.vx > 0){
            if(this.scene.map.tiles[pmy][pmx] != 0){
                const tile = {
                    x: pmx*SIZE + SIZE/2, 
                    y: pmy*SIZE + SIZE/2, 
                    w: SIZE, 
                    h: SIZE
                };

                this.scene.ctx.strokeStyle = "white";
                this.scene.ctx.strokeRect(tile.x - SIZE/2, tile.y - SIZE/2, SIZE, SIZE);
                if(this.collidedWith(tile)){
                    this.vx = 0;
                    this.x = tile.x - tile.w/2 - this.w/2 - 1;
                }

            }
        }
    }

    appliesLeftRestrictions(pmx, pmy){
        const SIZE = this.scene.map.SIZE;

        if(this.vx < 0){
            if(this.scene.map.tiles[pmy][pmx] != 0){
                const tile = {
                    x: pmx*SIZE + SIZE/2, 
                    y: pmy*SIZE + SIZE/2, 
                    w: SIZE, 
                    h: SIZE
                };

                this.scene.ctx.strokeStyle = "white";
                this.scene.ctx.strokeRect(tile.x - SIZE/2, tile.y - SIZE/2, SIZE, SIZE);
                if(this.collidedWith(tile)){
                    this.vx = 0;
                    this.x = tile.x + tile.w/2 + this.w/2 + 1;
                }

            }
        }
    }


    appliesLowRestrictions(pmx, pmy){
        const SIZE = this.scene.map.SIZE;

        if(this.vy > 0){
            if(this.scene.map.tiles[pmy][pmx] != 0){
                const tile = {
                    x: pmx*SIZE + SIZE/2, 
                    y: pmy*SIZE + SIZE/2, 
                    w: SIZE, 
                    h: SIZE
                };

                this.scene.ctx.strokeStyle = "white";
                this.scene.ctx.strokeRect(tile.x - SIZE/2, tile.y - SIZE/2, SIZE, SIZE);
                if(this.collidedWith(tile)){
                    this.vy = 0;
                    this.y = tile.y - tile.h/2 - this.h/2 - 1;
                }

            }
        }
    }

    appliesUpRestrictions(pmx, pmy){
        const SIZE = this.scene.map.SIZE;

        if(this.vy < 0){
            if(this.scene.map.tiles[pmy][pmx] != 0){
                const tile = {
                    x: pmx*SIZE + SIZE/2, 
                    y: pmy*SIZE + SIZE/2, 
                    w: SIZE, 
                    h: SIZE
                };

                this.scene.ctx.strokeStyle = "white";
                this.scene.ctx.strokeRect(tile.x - SIZE/2, tile.y - SIZE/2, SIZE, SIZE);
                if(this.collidedWith(tile)){
                    this.vy = 0;
                    this.y = tile.y + tile.h/2 + this.h/2 + 1;
                }

            }
        }
    }


   
}