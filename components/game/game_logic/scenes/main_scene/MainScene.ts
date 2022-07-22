// We need these import statements to tell NextJS to build the pages together with this page.
import { debug } from 'console';
import background from './assets/background_600x800.png';



export default class MainScene extends Phaser.Scene {

    // See StartScene.ts for why I do this nonsense
    static SCENE_KEY = 'main-scene' + Math.random();
    static BACKGROUND_KEY = this.SCENE_KEY + 'background';

    // Game values to be tweaked with
    /**
     * We are using the logistic growth model:
     * dN/dt = r(L-N)/L*N
     * N: no. pigeons
     * L: limit (carrying capacity)
     * r: contant of proportionality
     */
    pigeon_number = 10;
    carrying_capacity = 1000;
    constant_proportionality = 0.03;

    debug_pigeon_number!: Phaser.GameObjects.Text;
    debug_carrying_capacity!: Phaser.GameObjects.Text;
    debug_constant!: Phaser.GameObjects.Text;

    updatePigeonGrowth() {
        this.pigeon_number += this.constant_proportionality * (this.carrying_capacity - this.pigeon_number) / this.carrying_capacity * this.pigeon_number;
        this.debug_pigeon_number.setText("Pigeon number: " + Math.round(this.pigeon_number));
        this.debug_carrying_capacity.setText("Carrying capacity: " + this.carrying_capacity);
        this.debug_constant.setText("Constant of Proportionality: " + this.constant_proportionality);
    }

    constructor() {
        super(MainScene.SCENE_KEY);
    }

    preload() {
        this.load.image(MainScene.BACKGROUND_KEY, background.src)
    }

    create() {
        // Background, and stretch background to fit screen.
        const background = this.add.image(0, 0, MainScene.BACKGROUND_KEY).setOrigin(0, 0);
        background.setScale(Math.max(
            this.cameras.main.width / background.width,
            this.cameras.main.height / background.height
        ));

        this.debug_pigeon_number = this.add.text(100, 100, "").setColor('#000000')
        this.debug_carrying_capacity = this.add.text(100, 120, "").setColor('#000000')
        this.debug_constant = this.add.text(100, 140, "").setColor('#000000')

        // Update pigeon growth every 200ms
        // setInterval(() => this.updatePigeonGrowth(), 200)
        this.time.addEvent({
            callbackScope: this,
            delay: 200,
            loop: true,
            callback: () => this.updatePigeonGrowth()
        })
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    update() {
        
    }
}