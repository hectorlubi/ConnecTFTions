/**
 * GameGrid Component
 * -------------------
 * This component renders the main puzzle grid containing all tiles.
 * Each tile can be selected or deselected, and during submission,
 * selected tiles play a staggered "wave" animation.
 *
 * Props:
 * - tiles: Array of tile objects, each with a `word` property to display.
 * - selected: Array of indices representing currently selected tiles.
 * - onTileClick: Function called when a tile is clicked (receives tile index).
 * - isSubmitting: Boolean indicating whether the grid is in submission mode
 *   (used to trigger tile animations).
 */

export default function GameGrid({ tiles, selected, onTileClick, isSubmitting }) {
  return (
    <div className="grid">
      {tiles.map((tile, idx) => {
        const isSelected = selected.includes(idx);

        // calculate wave animation delay based on position (only when submitting)
        let delay = 0;
        if (isSelected && isSubmitting) {
          const selectionOrder = selected.indexOf(idx);
          delay = selectionOrder * 0.1; // 100ms between each tile
        }
        
        // decide if tile should be animated
        const shouldAnimate = isSelected && isSubmitting;

        return (
          <div
            key={`${tile.word}-${idx}`}
            onClick={() => onTileClick(idx)}
            className={`tile ${isSelected ? 'selected' : ''} ${shouldAnimate ? 'wave' : ''}`}
            style={{
              '--wave-delay': `${delay}s`
            }}
          >
            {tile.word}
          </div>
        );
      })}
    </div>
  );
}