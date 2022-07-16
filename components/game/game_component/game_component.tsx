import { Game } from 'phaser';
import React, { useEffect, useRef } from 'react';
// We don't import phaser here because it runs into a navigation error. Dynamic import later

// Embed for phaserjs game
export default function GameComponent() {

    let gamePromise = useRef<Promise<Game> | null>(null);

    useEffect(() => {
        // Load in module and game
        // Only load in new module if it hasn't been loaded in before
        gamePromise.current = gamePromise.current ?? import('../game_logic/game_main').then((x) => x.default);

        // Cleanup, is not needed (only one game instance, since game is loaded from module).
        // return () => void gamePromise.then((instance) => instance.destroy(true, false))
    }, [])

    return (
        <>
            <h1>Game</h1>
            <div id="game-content" />
        </>)
};

