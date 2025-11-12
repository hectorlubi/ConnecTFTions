// valculate overlap score between traits (lower is better)
const calculateOverlap = (trait1, trait2) => {
  const overlap = trait1.units.filter(u => trait2.units.includes(u));
  return overlap.length;
};

// dcore a set of traits (lower is better)
const scoreTraitSet = (traits) => {
  let totalOverlap = 0;
  for (let i = 0; i < traits.length; i++) {
    for (let j = i + 1; j < traits.length; j++) {
      totalOverlap += calculateOverlap(traits[i], traits[j]);
    }
  }
  return totalOverlap;
};

export const areTraitsCompatible = (traitIndices, data) => {
  const traits = traitIndices.map(i => data[i]);
  
  for (const currentTrait of traits) {
    const otherTraits = traits.filter(t => t.trait !== currentTrait.trait);
    const uniqueUnits = currentTrait.units.filter(unit => {
      return !otherTraits.some(otherTrait => otherTrait.units.includes(unit));
    });
    
    if (uniqueUnits.length < 4) return false;
  }
  
  return true;
};

export const generatePuzzle = (data) => {
  const maxAttempts = 1000;
  let bestPuzzle = null;
  let bestScore = Infinity;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // dtart with a random trait, preferring traits with more units
    const weightedStart = data
      .map((trait, idx) => ({ idx, weight: trait.units.length }))
      .filter(t => t.weight >= 4);
    
    const randomWeighted = weightedStart[Math.floor(Math.random() * weightedStart.length)];
    let selectedIndices = [randomWeighted.idx];

    // try to build a complete puzzle
    for (let added = 0; added < 3; added++) {
      const candidates = [];
      
      for (let i = 0; i < data.length; i++) {
        if (selectedIndices.includes(i)) continue;
        
        const testSet = [...selectedIndices, i];
        if (areTraitsCompatible(testSet, data)) {
          // calculate overlap score for this candidate
          const currentTraits = testSet.map(idx => data[idx]);
          const overlap = scoreTraitSet(currentTraits);
          candidates.push({ idx: i, overlap });
        }
      }
      
      if (candidates.length === 0) break;
      
      // sort by overlap (prefer less overlap) and add some randomness
      candidates.sort((a, b) => a.overlap - b.overlap);
      const topCandidates = candidates.slice(0, Math.min(5, candidates.length));
      const chosen = topCandidates[Math.floor(Math.random() * topCandidates.length)];
      selectedIndices.push(chosen.idx);
    }

    // if we found 4 compatible traits, try to build the puzzle
    if (selectedIndices.length === 4) {
      const selectedTraits = selectedIndices.map(i => data[i]);
      const puzzleGroups = [];
      const allSelectedUnits = [];
      let buildFailed = false;

      for (const traitInfo of selectedTraits) {
        const otherTraits = selectedTraits.filter(t => t.trait !== traitInfo.trait);
        const availableUnits = traitInfo.units.filter(unit =>
          !allSelectedUnits.includes(unit) &&
          !otherTraits.some(otherTrait => otherTrait.units.includes(unit))
        );

        if (availableUnits.length < 4) {
          buildFailed = true;
          break;
        }

        const shuffled = [...availableUnits].sort(() => Math.random() - 0.5);
        const selectedUnits = shuffled.slice(0, 4);
        allSelectedUnits.push(...selectedUnits);

        puzzleGroups.push({
          trait: traitInfo.trait,
          units: selectedUnits,
          color: traitInfo.color
        });
      }

      // if successful, check if this is the best puzzle so far
      if (!buildFailed && puzzleGroups.length === 4) {
        const score = scoreTraitSet(selectedTraits);
        if (score < bestScore) {
          bestScore = score;
          bestPuzzle = { groups: puzzleGroups };
          
          // if we found a puzzle with minimal overlap, use it
          if (score === 0) {
            return bestPuzzle;
          }
        }
      }
    }
  }

  // if we found any valid puzzle, return it
  if (bestPuzzle) {
    return bestPuzzle;
  }

  // fallback to costs (guaranteed no overlap)
  const costs = data.slice(0, 4);
  const puzzleGroups = costs.map(traitInfo => {
    const shuffled = [...traitInfo.units].sort(() => Math.random() - 0.5);
    return {
      trait: traitInfo.trait,
      units: shuffled.slice(0, 4),
      color: traitInfo.color
    };
  });

  return { groups: puzzleGroups };
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
