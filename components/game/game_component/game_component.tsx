import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';
// We don't import phaser here because it runs into a navigation error. Dynamic import later

// Embed for phaserjs game
export default function GameComponent() {
    useEffect(() => {
        const gamePromise = import('../game_logic/game_main').then((x) => x.default);

        // Cleanup, destroy game
        // return () => (console.log("Delete"), void gamePromise.then((instance) => instance.destroy(true, false)))
    }, [])

    return (
        <>
            <h1>Game</h1>
            <div id="game-content" />
        </>)
};

