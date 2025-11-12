export default function Controls({
  onShuffle,
  onDeselect,
  onSubmit,
  onNewPuzzle,
  submitDisabled
}) {
  return (
    <>
      <div className="controls">
        <button className="shuffle-btn" onClick={onShuffle}>
          Shuffle
        </button>
        <button className="deselect-btn" onClick={onDeselect}>
          Deselect
        </button>
      </div>

      <div className="bottom-controls">
        <button
          className="submit-btn"
          onClick={onSubmit}
          disabled={submitDisabled}
        >
          Submit
        </button>
        <button className="new-puzzle-btn" onClick={onNewPuzzle}>
          New Puzzle
        </button>
      </div>
    </>
  );
}