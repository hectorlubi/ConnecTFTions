/**
 * Controls Component
 * -------------------
 * This component renders the main control buttons for a puzzle or game interface.
 * It provides buttons to shuffle, deselect, submit, and generate a new puzzle.
 *
 * Props:
 * - onShuffle: Function to shuffle the puzzle pieces or board.
 * - onDeselect: Function to clear any current selections.
 * - onSubmit: Function to submit the current solution or guess.
 * - onNewPuzzle: Function to start a new puzzle.
 * - submitDisabled: Boolean flag to disable the Submit button when submission isn't allowed.
 */

export default function Controls({
  onShuffle,
  onDeselect,
  onSubmit,
  onNewPuzzle,
  submitDisabled
}) {
  return (
    <>
      {/* Top control section: shuffle and deselect actions */}
      <div className="controls">

        {/* Shuffles the puzzle pieces or randomizes layout */}
        <button className="shuffle-btn" onClick={onShuffle}>
          Shuffle
        </button>

        {/* Clears all selected pieces or current selections */}
        <button className="deselect-btn" onClick={onDeselect}>
          Deselect
        </button>
      </div>

      {/* Bottom control section: submission and new puzzle actions */}
      <div className="bottom-controls">
        
        {/* Submits the current puzzle or guess; disabled when not ready */}
        <button
          className="submit-btn"
          onClick={onSubmit}
          disabled={submitDisabled}
        >
          Submit
        </button>

        {/* Starts a completely new puzzle */}
        <button className="new-puzzle-btn" onClick={onNewPuzzle}>
          New Puzzle
        </button>
      </div>
    </>
  );
}