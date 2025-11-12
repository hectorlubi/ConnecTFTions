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