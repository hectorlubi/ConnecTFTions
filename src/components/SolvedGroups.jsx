/**
 * SolvedGroups Component
 * ----------------------
 * Displays the groups that the player has successfully solved.
 * Each group shows its trait, the units that belong to it, and a color
 * to visually distinguish it.
 *
 * Props:
 * - solvedGroups: Array of objects representing solved groups. Each object should contain:
 *   - trait: The shared trait of the group.
 *   - units: Array of unit names belonging to the group.
 *   - color: CSS class or color string to style the group visually.
 */

export default function SolvedGroups({ solvedGroups }) {
  return (
    <div className="solved-groups">
      {solvedGroups.map((group, idx) => (
        <div key={idx} className={`solved-group ${group.color}`}>

          {/* Display the trait of the group */}
          <div className="group-title">{group.trait}</div>

          {/* Display the units in the group as a comma-separated list */}
          <div className="group-words">{group.units.join(', ')}</div>
        </div>
      ))}
    </div>
  );
}