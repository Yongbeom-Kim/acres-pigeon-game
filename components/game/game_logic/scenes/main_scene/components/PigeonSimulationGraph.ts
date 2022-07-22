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
        this.minX = minX+10;
        this.maxX = maxX-10;
        this.minY = minY+10;
        this.maxY = maxY-10;

        this.deltaX = xStep;
        this.deltaY = 0;

        const background_rectangle = this.scene.add.rectangle(minX, minY, maxX - minX, maxY - minY, 0x999999).setOrigin(0, 0);

    }


    update(newPigeonPopulation: integer) {

        this.deltaY = this.getYCoord(newPigeonPopulation) - this.getYCoord(this.prevPigeonPopulation);

        const newLine = this.scene.add.line(
            0, 0,
            this.maxX - this.deltaX, this.minY - this.deltaY,
            this.maxX, this.minY,
            0x000000);

        this.lineGraphGroup.incX(- this.deltaX)
        this.lineGraphGroup.incY(- this.deltaY)

        this.lineGraphGroup.add(newLine);
        this.prevPigeonPopulation = newPigeonPopulation;

        // Delete lines exceeding the min x boundary.
        // We use a 'every' instead of a 'for-each' because every lets you terminate the loop early by not returning true.
        this.lineGraphGroup.getChildren().every(
            // this type cast is OK, everything in group is a line.
            // @ts-ignore
            (child: Phaser.GameObjects.Line) => {
                // console.log(child.x + this.xRight)
                if (child.x + this.maxX < this.minX) {
                    child.destroy();
                    return true;
                }
                return false;
            })

    }

    getYCoord(pigeonPopulation: integer) {
        return (this.scene.scale.height - pigeonPopulation / 2);
    }
}