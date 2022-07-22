/**
 * Converts a sprite to a hover button.
 * Sprite is first frame if not hovered upon,
 * Sprite is second frame if hovered upon.
 * @param sprite sprite to convert to a button
 * @returns a button
 */
export default function make_hover_button(sprite: Phaser.GameObjects.Sprite): Phaser.GameObjects.Sprite{
    sprite.setInteractive();
    
    // Make button interactive
    sprite.on('pointerover', () => sprite.setFrame(1));
    sprite.on('pointerout', () => sprite.setFrame(0));

    return sprite;
}