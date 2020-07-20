import React,{useState} from 'react';

function ProjectTypeForm (props){
    const [tasks, setTasks] = useState([])
    
    function addTask (e) {
        e.preventDefault();
        const newTask = document.getElementById('projectTask').value;
        setTasks(p => [...p, newTask]);
        console.log(tasks);
        document.getElementById('projectTask').value = '';
    }

    function addProjectType (e) {
        const projectType = document.getElementById('projectType').value;
        document.getElementById('projectType').value = '';
        props.addProjectType(projectType, tasks);
        setTasks([]);
        e.preventDefault();
    }

    return (
    <form>
        <h2>Project Type Form</h2>
        <input type='text' name='projectType' placeholder='Project Type' id='projectType'/>
        <br />
        <input type='text' name='projectTask' id='projectTask' placeholder='Add Task'/>
        <button onClick = {addTask}>+ Add Task</button>
        <ul>
            {tasks.map(task=> <li key={task}>{task}</li>)}
        </ul>
        <button onClick = {(e) => addProjectType(e)}>Submit</button>
    </form>
    )
}

export default ProjectTypeForm;

