import { useState, useEffect } from 'react';
import { generatePuzzle, shuffleArray } from '../utils/puzzleGenerator';

/**
 * useGame Custom Hook
 * ---------------------
 * Encapsulates all game state and logic for ConnecTFTions.
 * Handles puzzle generation, tile selection, submission,
 * mistakes, solved groups, modals, and animations.
 *
 * @param {Array} traitData - Data for the currently selected set (traits and units).
 * @returns {Object} - State values and functions for controlling the game.
 */

export const useGame = (traitData) => {
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [tiles, setTiles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [solvedGroups, setSolvedGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxMistakes = 4; // max allowed mistakes

  // initialize game
  useEffect(() => {
    // Reset everything when traitData changes (set switch)
    setMistakes(0);
    setSelected([]);
    setSolvedGroups([]);
    setShowModal(false);
    setIsSubmitting(false);
    initGame();
  }, [traitData]);

  // === Initialize Puzzle ===
  const initGame = () => {
    const puzzle = generatePuzzle(traitData);
    setCurrentPuzzle(puzzle);
    
    // flatten all group units into individual tiles
    const newTiles = [];
    puzzle.groups.forEach(group => {
      newTiles.push(...group.units.map(unit => ({
        word: unit,
        trait: group.trait,
        color: group.color
      })));
    });

    // shuffle tiles before displaying
    setTiles(shuffleArray(newTiles));
  };

  // === Shuffle Tiles ===
  const shuffleTiles = () => {
    setTiles(shuffleArray(tiles));
  };

  // === Tile Selection Logic ===
  const toggleSelect = (index) => {
    if (isSubmitting) return; // prevent selection during animation
    const selectedIndex = selected.indexOf(index);
    if (selectedIndex > -1) {
      // deselect tile if already selected
      setSelected(selected.filter(i => i !== index));
    } else if (selected.length < 4) {
      // add tile if fewer than 4 are selected
      setSelected([...selected, index]);
    }
  };

  const deselectAll = () => {
    if (isSubmitting) return;
    setSelected([]);
  };

  // === Submit Guess ===
  const submitGuess = () => {
    if (selected.length !== 4 || isSubmitting) return;
    
    setIsSubmitting(true); // start wave animation
    
    const guessedTiles = selected.map(i => tiles[i]);
    const trait = guessedTiles[0].trait;
    const isCorrect = guessedTiles.every(t => t.trait === trait);

    // wait for wave animation to complete (4 tiles * 50ms delay + 400ms animation)
    setTimeout(() => {
      if (isCorrect) {
        handleCorrectGuess(trait);
      } else {
        handleIncorrectGuess();
      }
      setIsSubmitting(false);
    }, 800);
  };

  // === Handle Correct Guess ===
  const handleCorrectGuess = (trait) => {
    const group = currentPuzzle.groups.find(g => g.trait === trait);

    // mark group as solved and remove tiles from grid
    setSolvedGroups([...solvedGroups, group]);
    setTiles(tiles.filter(t => t.trait !== trait));
    setSelected([]);

    if (tiles.filter(t => t.trait !== trait).length === 0) {
      // delay modal
      setTimeout(() => {
        setModalTitle('You Win!');
        setModalMessage('Congratulations! You are ready for Challenger!');
        setShowModal(true);
      }, 800);
    }
  };

  // === Handle Incorrect Guess ===
  const handleIncorrectGuess = () => {
    setMistakes(mistakes + 1);
    setSelected([]);

    if (mistakes + 1 >= maxMistakes) {
      const unsolvedGroups = currentPuzzle.groups.filter(group =>
        !solvedGroups.some(g => g.trait === group.trait)
      );
      setTiles([]);
      
      // reveal each unsolved group one at a time
      const revealDelay = 800;
      unsolvedGroups.forEach((group, index) => {
        setTimeout(() => {
          setSolvedGroups(prev => [...prev, group]);
        }, index * revealDelay);
      });
      
      // show modal after all groups are revealed
      setTimeout(() => {
        setModalTitle('Game Over');
        setModalMessage("You've run out of guesses. Stay in iron :(");
        setShowModal(true);
      }, unsolvedGroups.length * revealDelay + 500);
    }
  };

  // === Start a New Puzzle ===
  const newPuzzle = () => {
    setMistakes(0);
    setSelected([]);
    setSolvedGroups([]);
    setShowModal(false);
    setIsSubmitting(false);
    initGame();
  };

  // === Return all state and actions for use in components ===
  return {
    tiles,
    selected,
    mistakes,
    maxMistakes,
    solvedGroups,
    showModal,
    modalTitle,
    modalMessage,
    isSubmitting,
    shuffleTiles,
    toggleSelect,
    deselectAll,
    submitGuess,
    newPuzzle,
    setShowModal
  };
};
