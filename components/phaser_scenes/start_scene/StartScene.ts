// We need these import statements to tell NextJS to build the pages together with this page.
import background from './assets/background_600x800.png';
import start_game_button_spritesheet from './assets/start_button_spritesheet.png';
import start_game_button_json from './assets/start_button_spritesheet.json' assert {type: 'json'};
import MainScene from '../main_scene/MainScene';
import make_hover_button from '../main_scene/components/utils/make_hover_button';

// I'm so annoyed WTF? The image keys in Phaser are GLOBAL NAMESPACE like what the heck man, so I can't use
// 'background' key multiple times in different scenes, this is just bad design
// TODO: Maybe performance may be an issue with Math.random
export const SCENE_KEY = 'start-scene' + Math.random();
const BACKGROUND_KEY = SCENE_KEY + 'background';
const START_BUTTON_KEY = SCENE_KEY + 'start';

export default class SampleScene extends Phaser.Scene {

    constructor() {
        super(SCENE_KEY);
    }

    preload() {
        this.load.image(BACKGROUND_KEY, background.src)
        this.load.spritesheet(START_BUTTON_KEY, start_game_button_spritesheet.src, start_game_button_json)
    }

    create() {
        // Background, and stretch background to fit screen.
        const background = this.add.image(0, 0, BACKGROUND_KEY).setOrigin(0, 0);
        background.setScale(Math.max(
            this.cameras.main.width / background.width,
            this.cameras.main.height / background.height
        ));

        const start_game_button = make_hover_button(this.add.sprite(this.scale.width / 2, this.scale.height / 2, START_BUTTON_KEY));

        start_game_button.on('pointerdown', () => {
            // Very nice fade scene transition!
            this.cameras.main.fadeOut(1000, 0, 0, 0)

            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start(MainScene.SCENE_KEY);
            })
        });
    }

    update() {
    }
}