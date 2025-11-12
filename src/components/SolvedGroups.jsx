export default function SolvedGroups({ solvedGroups }) {
  return (
    <div className="solved-groups">
      {solvedGroups.map((group, idx) => (
        <div key={idx} className={`solved-group ${group.color}`}>
          <div className="group-title">{group.trait}</div>
          <div className="group-words">{group.units.join(', ')}</div>
        </div>
      ))}
    </div>
  );
}