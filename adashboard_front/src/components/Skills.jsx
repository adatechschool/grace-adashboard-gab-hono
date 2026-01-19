//Skills.jsx

export const Skills = ({ themeId, skills, onUpdateValidation }) => {
  return (
    <div>
      {skills.map((skill, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`label-${themeId}-${index}`}
          />

          <label htmlFor={`label-${themeId}-${index}`}>
            {skill.label}
          </label>

          <select
            value={skill.validation}
            onChange={(e) =>
              onUpdateValidation &&
              onUpdateValidation(themeId, index, e.target.value)
            }
          >
            <option value="OK">OK</option>
            <option value="PROGRESS">PROGRESS</option>
            <option value="KO">KO</option>
          </select>
        </div>
      ))}
    </div>
  );
};
