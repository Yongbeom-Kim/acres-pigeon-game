export default class PigeonSimulationGraph {

    scene: Phaser.Scene;
    lineGraphGroup: Phaser.GameObjects.Group;
    prevPigeonPopulation: integer;
    xCoord: integer
    xIncrement: integer

    constructor(scene: Phaser.Scene, initialPigeonPopulation: integer, initialX: integer, xIncrement: integer = 1) {
        this.scene = scene;
        this.lineGraphGroup = scene.add.group();
        this.prevPigeonPopulation = initialPigeonPopulation;
        this.xCoord = initialX;
        this.xIncrement = xIncrement;
    }

    addNextLine(newPigeonPopulation: integer) {
        const newLine = this.scene.add.line(
            0, 0,
            this.xCoord, this.getYCoord(this.prevPigeonPopulation),
            this.xCoord + this.xIncrement, this.getYCoord(newPigeonPopulation),
            0x000000);

        this.lineGraphGroup.add(newLine);
        this.xCoord += this.xIncrement;
        this.prevPigeonPopulation = newPigeonPopulation;
    }

    getYCoord(pigeonPopulation: integer) {
        return this.scene.scale.height - pigeonPopulation / 2;
    }
}