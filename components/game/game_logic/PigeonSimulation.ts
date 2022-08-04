export default class PigeonSimulation {
    /**
     * We are using the logistic growth model:
     * dN/dt = r(L-N)/L*N
     * N: no. pigeons
     * L: limit (carrying capacity)
     * r: contant of proportionality
     */
    private _pigeon_number;
    private _carrying_capacity;
    private _coefficient;

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
        pigeon_number: integer,
        carrying_capacity: integer,
        coefficient: integer,
        update_interval: number,
        onUpdate?: (() => void) | ((pigeonNumber: integer, carrying_capacity: integer, coefficient: number) => void)
    ) {
        this._pigeon_number = pigeon_number;
        this._carrying_capacity = carrying_capacity;
        this._coefficient = coefficient;
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
        this._pigeon_number += this._coefficient * (this._carrying_capacity - this._pigeon_number) / this._carrying_capacity * this._pigeon_number
            + (Math.random() - 0.5) * Math.log(this.pigeonNumber) * 2;
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