import start_game_button_spritesheet from './assets/placeholder_start_button.png';
import start_game_button_json from './assets/placeholder_start_button.json' assert {type: 'json'};

export default class SampleScene extends Phaser.Scene {

    constructor() {
        super('sample-scene');
    }

    graphics!: Phaser.GameObjects.Graphics;
    line!: Phaser.Geom.Line;
    text!: Phaser.GameObjects.Text;

    preload() {
        this.load.spritesheet('start_game_button', start_game_button_spritesheet.src, start_game_button_json)
    }

    create() {

        const start_game_button = this.add.sprite(this.scale.width/2, this.scale.height/2, 'start_game_button');
        // start_game_button.setPosition(this.scale.width/2, this.scale.height/2)  m ,
        start_game_button.setInteractive();

        start_game_button.on('pointerover', () => start_game_button.setFrame(1));
        start_game_button.on('pointerout', () => start_game_button.setFrame(0));
    }

    update() {
    }
}