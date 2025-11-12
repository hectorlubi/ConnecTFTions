export default function Modal({ show, title, message, onClose, onNewPuzzle }) {
  if (!show) return null;

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="new-puzzle-btn" onClick={onNewPuzzle}>
          New Puzzle
        </button>
      </div>
    </div>
  );
}