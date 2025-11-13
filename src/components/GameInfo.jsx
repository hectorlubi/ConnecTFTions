/**
 * GameInfo Component
 * -------------------
 * Displays the player's current mistake count using visual indicators (dots).
 * Each dot represents one possible mistake; filled dots indicate mistakes made.
 *
 * Props:
 * - mistakes: Number of mistakes the player has currently made.
 * - maxMistakes: Maximum number of mistakes allowed before the game ends.
 */

export default function GameInfo({ mistakes, maxMistakes }) {
  return (
    <div className="game-info">

      {/* Label for the mistakes display */}
      <div>Mistakes:</div>

      {/* Render a row of dots representing total and used mistakes */}
      <div className="mistakes">
        {/*
          Create an array of length `maxMistakes` to map over and render
          one dot per possible mistake slot.
        */}
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