export default class SampleScene extends Phaser.Scene {

    constructor() {
        super('sample-scene');
    }

    graphics!: Phaser.GameObjects.Graphics;
    line!: Phaser.Geom.Line;
    text!: Phaser.GameObjects.Text;

    create() {
        this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
        this.line = new Phaser.Geom.Line(200, 300, 600, 300);
        this.text = this.add.text(100, 50, '');
    }

    update() {
        Phaser.Geom.Line.Rotate(this.line, 0.02);
        this.graphics.clear();
        this.graphics.strokeLineShape(this.line);
        var angle = Phaser.Geom.Line.Angle(this.line);
        this.text.setText('Line Angle: ' + Phaser.Math.RadToDeg(angle));
    }
}