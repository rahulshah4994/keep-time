import React,{useState} from 'react';

function TaskOptions (props){
    const [editTasks, setEditTasks] = useState(false)

    function setEditStatus(){
        setEditTasks(!editTasks)
    }

    function deleteTask(e){
        e.preventDefault();
        console.log(e.target.id);
        props.deleteTask(e.target.id);
    }

    return(
        <div>
            <h2>Task Options<button onClick={setEditStatus}>Edit</button></h2>
            {props.tasks.map( task => 
                <span key={task.id}>
                    <button onClick={props.taskIsActive} value={task.id}>{task.name}</button>
                    {editTasks && <button id={task.id} onClick={deleteTask}>x</button>}
                </span>)}
        </div>
    )
}

export default TaskOptions;