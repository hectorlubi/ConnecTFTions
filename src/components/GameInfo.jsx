export default function GameInfo({ mistakes, maxMistakes }) {
  return (
    <div className="game-info">
      <div>Mistakes:</div>
      <div className="mistakes">
        {[...Array(maxMistakes)].map((_, i) => (
          <div
            key={i}
            className={`mistake-dot ${i < mistakes ? 'used' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}