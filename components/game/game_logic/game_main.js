// Dynamic import for phaserJS, do not edit
// Dynamic import for phaser is not needed because this module is loaded after navigator loads.
// const Phaser = (await import('phaser')).default;
import Phaser from 'phaser';

/**
 * GAME CODE BELOW
 */

var config = {
    parent: "game-content",
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    scene: {
        create: create,
        update: update
    }
};

let graphics;
let line;
let text;


function create() {
    graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });

    line = new Phaser.Geom.Line(200, 300, 600, 300);

    text = this.add.text(100, 50, '');
}

function update() {
    Phaser.Geom.Line.Rotate(line, 0.02);

    graphics.clear();

    graphics.strokeLineShape(line);

    var angle = Phaser.Geom.Line.Angle(line);

    text.setText('Line Angle: ' + Phaser.Math.RadToDeg(angle));
}


const Game = new Phaser.Game(config);

/**
 * GAME CODE ABOVE
 * Default export for game, do not edit.
 */
export default Game;