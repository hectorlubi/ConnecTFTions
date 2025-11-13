/**
 * Modal Component
 * -------------------
 * Displays a centered popup overlay (modal) with a title, message,
 * and a button to start a new puzzle. The modal can be closed
 * by clicking outside its content area.
 *
 * Props:
 * - show: Boolean that determines whether the modal is visible.
 * - title: String displayed as the modal's header.
 * - message: String providing additional information or feedback.
 * - onClose: Function called when the user clicks outside the modal to close it.
 * - onNewPuzzle: Function called when the "New Puzzle" button is clicked.
 */

export default function Modal({ show, title, message, onClose, onNewPuzzle }) {

  // If `show` is false, render nothing (modal hidden)
  if (!show) return null;

  return (
    // Modal overlay — clicking it triggers `onClose`
    <div className="modal active" onClick={onClose}>
      
      {/* Modal content — stops propagation to prevent accidental closing */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* Modal title */}
        <h2>{title}</h2>

        {/* Informational or feedback message */}
        <p>{message}</p>

        {/* Button to start a new puzzle */}
        <button className="new-puzzle-btn" onClick={onNewPuzzle}>
          New Puzzle
        </button>
      </div>
    </div>
  );
}