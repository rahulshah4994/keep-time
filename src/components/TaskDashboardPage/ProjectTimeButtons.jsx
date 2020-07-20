import React from 'react';

function ProjectTimeButtons(props){
    const timeOptions = [5, 15, 30, 45, 60];

    function updateProjectTime(e){
        const checked = e.target.checked;
        const value = parseInt(e.target.value);
        props.onClick(props.id, props.task, value, checked);
    }
    
    return(
        <div>
            {timeOptions.map(timeOption => (
                <span key = {timeOption}>
                    <input 
                    type='checkbox' 
                    value={timeOption} 
                    onClick={updateProjectTime}
                    />
                    <label>{timeOption}</label>
                </span>
            ))}
        </div>
    )
}

export default ProjectTimeButtons;