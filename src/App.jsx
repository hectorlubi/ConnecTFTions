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

function App() {
  const [currentSet, setCurrentSet] = useState(15);
  const [traitData, setTraitData] = useState(availableSets[15].data);
  const [backgroundImage, setBackgroundImage] = useState(availableSets[15].background);

  const game = useGame(traitData);

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

        <SetSelector
          currentSet={currentSet}
          onSetChange={handleSetChange}
          availableSets={availableSets}
        />

        <GameInfo mistakes={game.mistakes} maxMistakes={game.maxMistakes} />

        <SolvedGroups solvedGroups={game.solvedGroups} />

        <GameGrid
          tiles={game.tiles}
          selected={game.selected}
          onTileClick={game.toggleSelect}
          isSubmitting={game.isSubmitting}
        />

        <Controls
          onShuffle={game.shuffleTiles}
          onDeselect={game.deselectAll}
          onSubmit={game.submitGuess}
          onNewPuzzle={game.newPuzzle}
          submitDisabled={game.selected.length !== 4}
        />

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