import React, {useState} from 'react';

function ProjectOptions (props){

    const [isEditProjects, setIsEditProjects] = useState(false);

    function editProjects(){
        setIsEditProjects(!isEditProjects)
    }

    return(
        <div>
            <h2>Project Options<button onClick={editProjects}>Edit</button></h2>
            {props.projects.map( project => (
                <div> 
                    <h4>{project.projectName} : {project.projectType} 
                    {isEditProjects && 
                    <button 
                        id = {project.id} 
                        onClick={(e) => props.deleteProject(e.target.id)}>
                            x
                        </button>}
                    </h4>
                    {project.tasks.map((task,index) => (
                        <span key={project.id + '_' + index}>
                            <button 
                                onClick={props.projectTaskIsActive}
                                id={project.id}
                                value={task.taskName}
                                >{task.taskName}</button>
                        </span>
                    ))}
                    {isEditProjects &&
                        <form onSubmit={(e)=> {
                            e.preventDefault(); 
                            props.addProjectTask(project.id, e.target.elements.newTask.value);
                            e.target.elements.newTask.value='';
                            }}>
                            <input type='text' name='newTask'/>
                            <button>+</button> 
                        </form>}
                </div>

            ))}
        </div>
    )
}

export default ProjectOptions;