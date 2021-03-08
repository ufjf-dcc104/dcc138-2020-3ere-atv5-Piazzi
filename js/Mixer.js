export default class Mixer {

    constructor(numChannels){
        this.CHANNELS = 0;
        this.channels = [];
        this.setsUpChannels(numChannels);
    }

    setsUpChannels(numChannels = 10){
        this.CHANNELS = numChannels;
        this.channels = [];
        for (let c = 0; c < this.CHANNELS; c++) {
            const channel = {
                end: new Date().getTime(),
                audio: new Audio()
            };
            this.channels[c] = channel;
            
        }
    }

    play(audio){
        const now = new Date().getTime();
        for (let c = 0; c < this.CHANNELS; c++) {
            const channel = this.channels[c];
            if(channel.end < now)
            {
                channel.audio.src = audio.src;
                channel.end = now + audio.duration*1000;
                channel.audio.volume = 0.5;
                channel.audio.play();
                break;
            }
            
        }
    }
}