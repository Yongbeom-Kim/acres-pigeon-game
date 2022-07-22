export default class PigeonSimulationGraph {

    scene: Phaser.Scene;
    lineGraphGroup: Phaser.GameObjects.Group;
    prevPigeonPopulation: integer;
    leftXBoundary: integer
    rightXBoundary: integer
    xStep: integer

    constructor(scene: Phaser.Scene, initialPigeonPopulation: integer, leftXBoundary: integer, rightXBoundary: integer, xStep: integer = 1) {
        this.scene = scene;
        this.lineGraphGroup = scene.add.group();
        this.prevPigeonPopulation = initialPigeonPopulation;
        this.leftXBoundary = leftXBoundary;
        this.rightXBoundary = rightXBoundary;
        this.xStep = xStep;
    }

    update(newPigeonPopulation: integer) {

        const newLine = this.scene.add.line(
            0, 0,
            this.rightXBoundary - this.xStep, this.getYCoord(this.prevPigeonPopulation),
            this.rightXBoundary, this.getYCoord(newPigeonPopulation),
            0x000000);

        this.lineGraphGroup.incX(- this.xStep)
        this.lineGraphGroup.getChildren().every(
            // this type cast is OK, everything in group is a line.
            // @ts-ignore
            (child: Phaser.GameObjects.Line) => {
                // console.log(child.x + this.xRight)
                if (child.x + this.rightXBoundary < this.leftXBoundary) {
                    child.destroy();
                    return true;
                }
            })

        this.lineGraphGroup.add(newLine);
        this.prevPigeonPopulation = newPigeonPopulation;
    }

    getYCoord(pigeonPopulation: integer) {
        return this.scene.scale.height - pigeonPopulation / 2;
    }
}