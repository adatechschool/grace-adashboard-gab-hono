//Themes.jsx
import { useState, useEffect } from "react";
import { Skills } from './Skills';

export const Themes = ({ data, onEditTheme }) => {
  const [themes, setThemes] = useState(data);

  useEffect(() => {
    setThemes(data);
  }, [data]);

  const deleteTheme = async (themeId) => {
    await fetch(`http://localhost:3000/themes/${themeId}`, {
      method: "DELETE",
    });
    setThemes(themes.filter((theme) => theme.id !== themeId));
  };

  return (
    <div>
      {themes.map((theme) => (
        <div key={theme.id}>
          <fieldset>
            <h2>{theme.name}</h2>

            <button onClick={() => deleteTheme(theme.id)}>
              Remove this theme
            </button>

            <button onClick={() => onEditTheme(theme)}>
              Edit Theme
            </button>

            <Skills
                themeId={theme.id}
                skills={theme.skills}
                />
          </fieldset>
        </div>
      ))}
    </div>
  );
};