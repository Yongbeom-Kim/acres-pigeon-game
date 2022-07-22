// We need these import statements to tell NextJS to build the pages together with this page.
import background from './assets/background_600x800.png';

// See StartScene.ts for why I do this nonsense
const SCENE_KEY  = 'main-scene' + Math.random();
const BACKGROUND_KEY = SCENE_KEY + 'background';

export default class MainScene extends Phaser.Scene {

    constructor() {
        super('main-scene');
    }

    preload() {
        this.load.image(BACKGROUND_KEY, background.src)
    }

    create() {
        // Background, and stretch background to fit screen.
        const background = this.add.image(0, 0, BACKGROUND_KEY).setOrigin(0, 0);
        background.setScale(Math.max(
            this.cameras.main.width / background.width,
            this.cameras.main.height / background.height
        ));

    }

    update() {
    }
}