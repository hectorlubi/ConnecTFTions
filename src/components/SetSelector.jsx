export default function SetSelector({ currentSet, onSetChange, availableSets }) {
  return (
    <div className="set-selector">
      <select
        value={currentSet}
        onChange={(e) => onSetChange(Number(e.target.value))}
        className="set-dropdown"
      >
        {Object.entries(availableSets).map(([setNum, setInfo]) => (
          <option key={setNum} value={setNum}>
            {setInfo.name}
          </option>
        ))}
      </select>
    </div>
  );
}