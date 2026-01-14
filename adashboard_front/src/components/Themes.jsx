import { useState, useEffect } from "react"
import { Skills } from "./Skills";

export const Themes = ({data}) => {

    const [themes, setThemes] = useState(data);
     useEffect(() => {
        setThemes(data);
    }, [data]);

    const deleteTheme = async(themeId) => {
        try {
            const response = await fetch(`http://localhost:3000/themes/${themeId}`, {
                method: 'DELETE'
            })
            
            if (response.ok) {
                setThemes(themes.filter(theme => theme.id !== themeId));
            }
            console.log('The theme has been successfully deleted')
        }
        catch (error) {
            console.log(`ERROR DELETING: ${error}`)
        }
    }

    const updateValidation = async(themeId, skillIndex, status) => {
        
        setThemes(prev => {
            return prev.map(theme => {
                if (theme.id !== themeId) {
                    return theme;
                }

                const updateSkills = theme.skills.map ((skill, index) => {
                    if (index !== skillIndex) {
                        return skill;
                    }
                    return {
                        ...skill,
                        validation: status
                    };
                });
                return {
                    ...theme,
                    skills: updateSkills
                };
            });
        });

        try {
            const response = await fetch(`http://localhost:3000/themes/${themeId}/skills/${skillIndex}/${status}`, {
                method: 'PUT'
            })
        }
        catch (error) {
            console.error(`Error updating: ${error}`)
        }
    }

    return (
    <div>
        {themes.map((theme) => {
            return (
            <div key={theme.id}>
            <fieldset>
                <h2>{theme.name}</h2>
                <button onClick={() => deleteTheme(theme.id)}>Remove this theme</button>
            <Skills
                themeId={theme.id}
                skills={theme.skills}
                onUpdateValidation={updateValidation}/>
            </fieldset>
            </div>          
            )
        })}
    </div>
    )
}