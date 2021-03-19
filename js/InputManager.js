export default class InputManager {
    constructor() {
        this.commands = new Map();
        this.keys = new Map();

    }

    configureKeyboard(actions){
        for (const key in actions) {
            const command = actions[key];
            this.commands.set(command, false);
            this.keys.set(key, command);
        }
        const that = this;

        addEventListener("keydown", function(e){
            const command = that.keys.get(e.key)
            if(command){
                that.commands.set(command, true)
            }
        });

        addEventListener("keyup", function(e){
            const command = that.keys.get(e.key)
            if(command){
                that.commands.set(command, false)
            }
        });
    }
}