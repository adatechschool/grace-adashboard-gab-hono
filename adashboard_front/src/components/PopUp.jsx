//PopUp.jsx

import { useState } from "react";

export const PopUp = ({ theme, onClose, onThemeAdded }) => {
    const [themeInput, setThemeInput] = useState(theme ? theme.name : "");
    const [skills, setSkills] = useState(
    theme ? theme.skills : [{ label: "", validation: "KO" }]
    );

  const [error, setError] = useState("");

    const addTheme = async (e) => {
    e.preventDefault();

    const payload = {
        name: themeInput,
        skills
    };

    if (theme) {
        // ✏️ EDIT
        await fetch(`http://localhost:3000/themes/${theme.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
        });
    } else {
        // ➕ CREATE
        await fetch("http://localhost:3000/themes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
        });
    }

    onThemeAdded();
    onClose();
    };


  // ➕ agregar skill
  const addSkill = () => {
    setSkills([...skills, { label: "", validation: "KO" }]);
  };

  // 🗑 eliminar skill
  const deleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // ✏ modificar skill
  const updateSkill = (index, field, value) => {
    setSkills(
      skills.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      )
    );
  };

  return (
    <div className="popup">
      <form onSubmit={addTheme}>
        <fieldset>
            
          <h2>{theme ? "Edit Theme" : "Add Theme"}</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <input
            type="text"
            placeholder="Theme name"
            value={themeInput}
            onChange={(e) => setThemeInput(e.target.value)}
          />

          <h3>Skills</h3>

          {skills.map((skill, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Skill name"
                value={skill.label}
                onChange={(e) =>
                  updateSkill(index, "label", e.target.value)
                }
              />

              <select
                value={skill.validation}
                onChange={(e) =>
                  updateSkill(index, "validation", e.target.value)
                }
              >
                <option value="OK">OK</option>
                <option value="PROGRESS">PROGRESS</option>
                <option value="KO">KO</option>
              </select>

              <button type="button" onClick={() => deleteSkill(index)}>
                🗑
              </button>
            </div>
          ))}

          <button type="button" onClick={addSkill}>
            ➕ Add skill
          </button>

          <br />

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </fieldset>
      </form>
    </div>
  );
};
