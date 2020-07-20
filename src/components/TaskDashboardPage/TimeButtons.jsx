import React from 'react';

function TimeButtons(props){
    const timeOptions = [5, 15, 30, 45, 60];

    function updateTime(e){
        const checked = e.target.checked;
        const value = parseInt(e.target.value);
        props.onClick(props.id, value, checked);
    }
    
    return(
        <div>
            {timeOptions.map(timeOption => (
                <span key = {timeOption}>
                    <input 
                    type='checkbox' 
                    value={timeOption} 
                    onClick={updateTime}
                    />
                    <label>{timeOption}</label>
                </span>
            ))}
        </div>
    )
}

export default TimeButtons;