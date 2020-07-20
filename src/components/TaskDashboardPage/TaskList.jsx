import React from 'react';
import TimeButtons from './TimeButtons';
import TimeConverter from './TimeConverter';

function TaskList(props){
    return(
        <div>
            <h2>Task List</h2>
            {props.tasks.map(task => {if (task.isActive) {
                return (
                    <div key={task.id}>
                    <h3>{task.name}: {TimeConverter(task.time)}</h3>
                    <TimeButtons id={task.id} onClick={props.updateTime}/>
                    </div>
                ) 
            } else {return null}
        })}
        </div>
        )
}

export default TaskList;