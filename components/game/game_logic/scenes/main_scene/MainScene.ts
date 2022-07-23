// We need these import statements to tell NextJS to build the pages together with this page.
import background from './assets/background_600x800.png';
import action_button_spritesheet from './assets/actions_button_spritesheet.png';
import action_button_json from './assets/actions_button_spritesheet.json' assert {type: 'json'};
import make_hover_button from '../../utils/make_hover_button';
import PigeonSimulationGraph from './components/PigeonSimulationGraph';
import PigeonSimulation from './components/PigeonSimulation';


export default class MainScene extends Phaser.Scene {

    // See StartScene.ts for why I do this nonsense
    static SCENE_KEY = 'main-scene' + Math.random();
    static BACKGROUND_KEY = this.SCENE_KEY + 'background';
    static ACTION_BUTTON_KEY = this.SCENE_KEY + 'action-button';

    // Game values to be tweaked with


    actionButton!: Phaser.GameObjects.Sprite;
    lineGraphGroup!: Phaser.GameObjects.Group;
    prevPigeonNumber!: number;


    constructor() {
        super(MainScene.SCENE_KEY);
    }

    preload() {
        this.load.image(MainScene.BACKGROUND_KEY, background.src)
        this.load.spritesheet(MainScene.ACTION_BUTTON_KEY, action_button_spritesheet.src, action_button_json)
    }

    create() {
        // Background, and stretch background to fit screen.
        const background = this.add.image(0, 0, MainScene.BACKGROUND_KEY).setOrigin(0, 0);
        background.setScale(Math.max(
            this.cameras.main.width / background.width,
            this.cameras.main.height / background.height
        ));


        // Buttons
        this.actionButton = make_hover_button(this.add.sprite(10, this.scale.height - 10, MainScene.ACTION_BUTTON_KEY))
            .setOrigin(0, 1);

        const pigeonSimulation = new PigeonSimulation(this, 20, 1000, 0.03, 50)
        const pigeonSimulationGraph = new PigeonSimulationGraph(
            this,
            20,
            20 + this.actionButton.width, this.scale.width * 2 / 3,
            this.scale.height - 100, this.scale.height,
            Math.round(Math.E ** (20*pigeonSimulation.coefficient)))

        const debugElements = new DebugElements(this);

        pigeonSimulation.addUpdateListener((n, cap, coe) => {
            debugElements.updateElements(n, cap, coe);
            pigeonSimulationGraph.update(n);
        });

        this.cameras.main.fadeIn(1000, 0, 0, 0)
    }

    update() {
    }
}

class DebugElements {
    scene: Phaser.Scene;

    pigeon_number_element: Phaser.GameObjects.Text;
    carrying_capacity_element: Phaser.GameObjects.Text;
    coefficient_element: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.pigeon_number_element = this.scene.add.text(100, 400, "").setColor('#000000')
        this.carrying_capacity_element = this.scene.add.text(100, 420, "").setColor('#000000')
        this.coefficient_element = this.scene.add.text(100, 440, "").setColor('#000000')
    }

    updateElements(pigeon_number: integer, carrying_capacity: integer, coefficient: number) {
        this.pigeon_number_element.setText("Pigeon number: " + pigeon_number);
        this.carrying_capacity_element.setText("Carrying capacity: " + carrying_capacity);
        this.coefficient_element.setText("Constant of Proportionality: " + coefficient);
    }
}