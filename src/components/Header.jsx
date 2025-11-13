/**
 * Header Component
 * -------------------
 * Displays the main title and subtitle for the ConnecTFTions game.
 * The current set number is dynamically displayed based on the provided prop.
 *
 * Props:
 * - currentSet: Number representing the currently active set of the game.
 */

export default function Header({ currentSet }) {
  return (
    <div className="header">
      {/* Main game title including the current set number */}
      <h1>ConnecTFTions - Set {currentSet}</h1>

      {/* Subtitle providing a brief description of the game objective */}
      <p>Group four units by their shared traits!</p>
    </div>
  );
}