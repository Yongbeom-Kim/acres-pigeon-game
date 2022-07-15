import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
// We don't import phaser here because it runs into a navigation error. Dynamic import later

// Embed for phaserjs game
export default function GameComponent() {
    useEffect(() => {
        const gameInstance = game();

        // Cleanup, destroy game
        return () => void gameInstance.then((instance) => instance.destroy(true, false))
    }, [])
    return (
        <>
            <h1>Game</h1>
            <div id="game-content" />
        </>)
};

async function game() {
    // Dynamic import for phaserJS, do not edit
    const Phaser = (await import('phaser')).default;

    // Game code below
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


    const game = new Phaser.Game(config);

    return game;
}