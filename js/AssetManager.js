export default class AssetManager{
    
    constructor(){
        this.toLoad = 0;
        this.loaded = 0;
        this.images = new Map();
        this.audios = new Map();
    } 

    loadAudio(key, source){
        const audio = new Audio();
        audio.addEventListener("canplay", () => {
            console.log(`Data ${this.loaded}/${this.toLoad} loaded!`);
            this.loaded++;
        });

        audio.src = source;
        this.audios.set(key, audio);
        this.toLoad++;
    }

    loadImage(key, source){
        const img1 = new Image();
        img1.addEventListener("load", () => {
            console.log(`Image ${this.loaded}/${this.toLoad} loaded!`);
            this.loaded++;
        });

        img1.src = source;
        this.images.set(key, img1);
        this.toLoad++;
    }


    img(key){
        return this.images.get(key);
    }

    audio(key){
        return this.audios.get(key);
    }
    
    progress(){
        if(this.toLoad > 0){
            return `${(this.loaded/this.toLoad*100).toFixed(2)}%`;
        }
        return "Nothing to load";
    }

    finished(){
        return this.loaded === this.toLoad;
    }



}