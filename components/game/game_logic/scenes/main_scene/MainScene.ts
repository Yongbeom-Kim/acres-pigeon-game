// We need these import statements to tell NextJS to build the pages together with this page.
import background from './assets/background_600x800.png';
import action_button_spritesheet from './assets/actions_button_spritesheet.png';
import action_button_json from './assets/actions_button_spritesheet.json' assert {type: 'json'};
import make_hover_button from '../../utils/make_hover_button';
import PigeonSimulationGraph from './components/PigeonSimulationGraph';


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

        const pigeonSimulation = new PigeonSimulation(this, 200)
        const pigeonSimulationGraph = new PigeonSimulationGraph(
            this, 
            20, 
            20 + this.actionButton.width, this.scale.width*2/3, 
            this.scale.height - 100, this.scale.height,
            2)

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



class PigeonSimulation {
    /**
     * We are using the logistic growth model:
     * dN/dt = r(L-N)/L*N
     * N: no. pigeons
     * L: limit (carrying capacity)
     * r: contant of proportionality
     */
    private _pigeon_number = 10;
    private _carrying_capacity = 10000;
    private _coefficient = 0.03;

    // List of update callbacks to be called when the pigeon simulation is updated
    private _onChangeCallbacks: Array<Function> = [];

    update_interval: integer;

    /**
     * Starts the pigeon growth simulation with an attached simulation event handler
     * A time interval event starts with:
     * (1) update simluation, and
     * (2) calls every function in this._onChangeCallbacks
     * 
     * @param scene scene that simulation is attached to
     * @param update_interval update interval for simulation in milliseconds
     * @param onUpdate callback function to be called
     */
    constructor(
        scene: Phaser.Scene,
        update_interval: number,
        onUpdate?: (() => void) | ((pigeonNumber: integer, carrying_capacity: integer, coefficient: number) => void)
    ) {

        this.update_interval = update_interval;
        if (typeof onUpdate !== 'undefined') {
            this._onChangeCallbacks.push(onUpdate);
        }

        scene.time.addEvent({
            callbackScope: this,
            delay: update_interval,
            loop: true,
            callback: () => {
                this.update();

                this._onChangeCallbacks.forEach((onUpdate) => {
                    if (onUpdate.length == 0) {
                        // This should be okay, im checking the argument length of the function
                        // @ts-ignore
                        onUpdate();
                    } else {
                        onUpdate(Math.round(this._pigeon_number), Math.round(this._carrying_capacity), this._coefficient)
                    }
                });
            }
        })
    }

    update() {
        // Just a small optimisation
        if (this._pigeon_number >= this._carrying_capacity - 1) {
            return;
        }
        this._pigeon_number += this._coefficient * (this._carrying_capacity - this._pigeon_number) / this._carrying_capacity * this._pigeon_number;
    }

    /**
     * Add a function callback to listen for updates in the simulation
     * @param onUpdate function callback to be called
     */
    addUpdateListener(onUpdate: (() => void) | ((pigeonNumber: integer, carrying_capacity: integer, coefficient: number) => void)) {
        this._onChangeCallbacks.push(onUpdate);
    }

    get pigeonNumber() {
        return this._pigeon_number;
    }

    get carryingCapacity() {
        return this._carrying_capacity;
    }

    get coefficient() {
        return this._coefficient;
    }


}

class DebugElements {
    scene: Phaser.Scene;

    pigeon_number_element: Phaser.GameObjects.Text;
    carrying_capacity_element: Phaser.GameObjects.Text;
    coefficient_element: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.pigeon_number_element = this.scene.add.text(100, 100, "").setColor('#000000')
        this.carrying_capacity_element = this.scene.add.text(100, 120, "").setColor('#000000')
        this.coefficient_element = this.scene.add.text(100, 140, "").setColor('#000000')
    }

    updateElements(pigeon_number: integer, carrying_capacity: integer, coefficient: number) {
        this.pigeon_number_element.setText("Pigeon number: " + pigeon_number);
        this.carrying_capacity_element.setText("Carrying capacity: " + carrying_capacity);
        this.coefficient_element.setText("Constant of Proportionality: " + coefficient);
    }
}