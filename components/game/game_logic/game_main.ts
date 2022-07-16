// Dynamic import for phaserJS, do not edit
// Dynamic import for phaser is not needed because this module is loaded after navigator loads.
// const Phaser = (await import('phaser')).default;
import Phaser from 'phaser';
import SampleScene from './scenes/SampleScene';

// Game Config

const config: Phaser.Types.Core.GameConfig = {
    parent: "game-content",
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    scene: [SampleScene]
};

export default new Phaser.Game(config);