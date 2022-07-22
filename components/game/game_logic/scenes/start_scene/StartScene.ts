// We need these import statements to tell NextJS to build the pages together with this page.
import background from './assets/background_600x800.png';
import start_game_button_spritesheet from './assets/start_button_spritesheet.png';
import start_game_button_json from './assets/start_button_spritesheet.json' assert {type: 'json'};

export default class SampleScene extends Phaser.Scene {

    constructor() {
        super('sample-scene');
    }

    graphics!: Phaser.GameObjects.Graphics;
    line!: Phaser.Geom.Line;
    text!: Phaser.GameObjects.Text;

    preload() {
        this.load.image('background', background.src)
        this.load.spritesheet('start_game_button', start_game_button_spritesheet.src, start_game_button_json)
    }

    create() {
        // Background, and stretch background to fit screen.
        const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        background.setScale(Math.max(
            this.cameras.main.width / background.width,
            this.cameras.main.height / background.height
        ));

        const start_game_button = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'start_game_button');
        start_game_button.setInteractive();

        // Make button interactive
        start_game_button.on('pointerover', () => start_game_button.setFrame(1));
        start_game_button.on('pointerout', () => start_game_button.setFrame(0));



    }

    update() {
    }
}