import { captureRejectionSymbol } from "events";

export default class PigeonSimulationGraph {

    scene: Phaser.Scene;
    lineGraphGroup: Phaser.GameObjects.Group;
    prevPigeonPopulation: integer;
    minX: integer
    maxX: integer
    minY: integer
    maxY: integer

    deltaY: integer
    deltaX: integer

    constructor(
        scene: Phaser.Scene,
        initialPigeonPopulation: integer,
        minX: integer,
        maxX: integer,
        minY: integer,
        maxY: integer,
        xStep: integer = 1,

    ) {
        this.scene = scene;
        this.lineGraphGroup = scene.add.group();
        this.prevPigeonPopulation = initialPigeonPopulation;
        this.minX = minX + 10;
        this.maxX = maxX - 10;
        this.minY = minY + 10;
        this.maxY = maxY - 10;

        this.deltaX = xStep;
        this.deltaY = 0;

        const background_rectangle = this.scene.add.rectangle(minX, minY, maxX - minX, maxY - minY, 0x999999).setOrigin(0, 0);

    }


    update(newPigeonPopulation: integer) {

        this.deltaY = this.getYCoord(newPigeonPopulation) - this.getYCoord(this.prevPigeonPopulation);

        const newLine = this.scene.add.line(
            this.maxX, (this.minY + this.maxY)/2,
            - this.deltaX, - this.deltaY,
            0, 0,
            0x000000);

        this.lineGraphGroup.incX(- this.deltaX)
        this.lineGraphGroup.incY(- this.deltaY)

        this.lineGraphGroup.add(newLine);
        this.prevPigeonPopulation = newPigeonPopulation;

        // Delete lines exceeding the min x boundary, hide lines exceeding y boundaries
        this.lineGraphGroup.getChildren().forEach(
            // this type cast is OK, everything in group is a line.
            // @ts-ignore
            (child: Phaser.GameObjects.Line) => {
                // console.log(child.x + this.xRight)
                if (child.x < this.minX) {
                    child.destroy();
                }

                if (child.y > this.maxY || child.y < this.minY) {
                    child.setAlpha(0);
                } else {
                    child.setAlpha(1);
                }
            })

    }

    getYCoord(pigeonPopulation: integer) {
        return (this.scene.scale.height - pigeonPopulation / 2);
    }
}