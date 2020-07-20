import React from 'react';
import ProjectTimeButtons from './ProjectTimeButtons';
import TimeConverter from './TimeConverter';

function ProjectTaskList (props) {


    return(
        <div>
            <h2>Project Task List</h2>
            {props.projects.map(project => (
                <div key={project.id}>
                    {project.tasks.map( (task, index) => {
                        if(task.isActive){
                            return (
                                <div key={project.id + '_'+index}>
                                    <h3 >{project.projectName} - {task.taskName}: {TimeConverter(task.time)}</h3>
                                    <ProjectTimeButtons id={project.id} task={task.taskName} onClick={props.updateProjectTime}/>
                                </div>
                            )
                        } else {return null}
                    })}
                </div>))}

        </div>
    )
}
export default ProjectTaskList;
