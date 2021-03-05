export default class AssetManager{
    
    constructor(){
        this.toLoad = 0;
        this.loaded = 0;
        this.images = new Map();
    } 

    loadImage(key, source){
        const img1 = new Image();
        img1.src = source;

        this.images.set(key, img1);
    }


    img(key){
        return this.images.get(key);
    }
    
    progress(){
        if(this.toLoad > 0){
            return `${(this.loaded/this.toLoad*100).toFixed(2)}%`;
        }
        return "Nothing to load";
    }



}