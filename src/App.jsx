import { useState } from 'react';
import Header from './components/Header';
import SetSelector from './components/SetSelector';
import GameInfo from './components/GameInfo';
import SolvedGroups from './components/SolvedGroups';
import GameGrid from './components/GameGrid';
import Controls from './components/Controls';
import Modal from './components/Modal';
import { useGame } from './hooks/useGame';
import { availableSets } from './data/sets';
import './App.css';

/**
 * App Component
 * ----------------
 * Main entry point for the ConnecTFTions game.
 * Handles current set selection, background image, and integrates
 * all game components (grid, controls, solved groups, modals, etc.).
 */
function App() {
  // === State for current set and related data ===
  const [currentSet, setCurrentSet] = useState(15);
  const [traitData, setTraitData] = useState(availableSets[15].data);
  const [backgroundImage, setBackgroundImage] = useState(availableSets[15].background);

  // === contains all game state and actions ===
  const game = useGame(traitData);

  // === Handle switching between sets ===
  const handleSetChange = (setNumber) => {
    setCurrentSet(setNumber);
    setTraitData(availableSets[setNumber].data);
    setBackgroundImage(availableSets[setNumber].background);
  };

   return (
    <>
      {/* Background layer — apply backgroundImage from state */}
      <div
        className="background-layer"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      />

      {/* Foreground content */}
      <div className="container">
        <Header currentSet={currentSet} />

        {/* Dropdown to switch between available sets */}
        <SetSelector
          currentSet={currentSet}
          onSetChange={handleSetChange}
          availableSets={availableSets}
        />

        {/* Game info: mistakes counter */}
        <GameInfo mistakes={game.mistakes} maxMistakes={game.maxMistakes} />

        {/* Display solved groups */}
        <SolvedGroups solvedGroups={game.solvedGroups} />

        {/* Main puzzle grid */}
        <GameGrid
          tiles={game.tiles}
          selected={game.selected}
          onTileClick={game.toggleSelect}
          isSubmitting={game.isSubmitting}
        />

        {/* Control buttons: shuffle, deselect, submit, new puzzle */}
        <Controls
          onShuffle={game.shuffleTiles}
          onDeselect={game.deselectAll}
          onSubmit={game.submitGuess}
          onNewPuzzle={game.newPuzzle}
          submitDisabled={game.selected.length !== 4}
        />

        {/* Modal for win/game over messages */}
        <Modal
          show={game.showModal}
          title={game.modalTitle}
          message={game.modalMessage}
          onClose={() => game.setShowModal(false)}
          onNewPuzzle={game.newPuzzle}
        />
      </div>
    </>
  );
}

export default App;