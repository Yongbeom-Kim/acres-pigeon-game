// Dynamic import for phaserJS, do not edit
// Dynamic import for phaser is not needed because this module is loaded after navigator loads.
// const Phaser = (await import('phaser')).default;
import Phaser from 'phaser';
import SampleScene from './scenes/SampleScene';

// Game Config
const aspectRatio = 4/3;
const height = window.innerHeight;
const width = height*aspectRatio;

const config: Phaser.Types.Core.GameConfig = {
    parent: "game-content",
    type: Phaser.AUTO,
    scene: [SampleScene],
    backgroundColor: '#FFFFFF',
    // width: 400,
    // height: 300,
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: width,
        height: height,

    }
};
const game = new Phaser.Game(config);
export default game