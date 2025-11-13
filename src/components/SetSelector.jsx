/**
 * SetSelector Component
 * ----------------------
 * Renders a dropdown menu for selecting the active game set.
 *
 * Props:
 * - currentSet: The currently selected set number (used as the dropdown's value).
 * - onSetChange: Function called when the user selects a different set (receives the new set number).
 * - availableSets: Object containing all available sets, where each key is a set number
 *   and each value contains metadata such as the set's name.
 */
export default function SetSelector({ currentSet, onSetChange, availableSets }) {
  return (
    <div className="set-selector">
      {/* Dropdown menu for selecting a set */}
      <select
        value={currentSet}
        onChange={(e) => onSetChange(Number(e.target.value))}
        className="set-dropdown"
      >
        
        {/* Render an option for each available set */}
        {Object.entries(availableSets).map(([setNum, setInfo]) => (
          <option key={setNum} value={setNum}>
            {setInfo.name}
          </option>
        ))}
      </select>
    </div>
  );
}