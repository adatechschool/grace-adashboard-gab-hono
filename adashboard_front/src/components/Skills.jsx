export const Skills = ({themeId, skills, onUpdateValidation}) => {

    return (
        <div>
            {skills.map ((skill, index) => {
                return (
                    <div key={index}>
                        <input
                            type='checkbox'
                            id={`label-${themeId}-${index}`}
                            name="label"/>
                        <label htmlFor={`label-${themeId}-${index}`}>{skill.label}</label>
                            <select
                                name='status'
                                id={`status-${themeId}-${index}`}
                                value={skill.validation}
                                onChange={(e) => onUpdateValidation(themeId, index, e.target.value)}>
                                <option value='OK'>OK</option>
                                <option value='PROGRESS'>PROGRESS</option>
                                <option value='KO'>KO</option>
                            </select>
                    </div>
                )
            })}
        </div>
    )
}