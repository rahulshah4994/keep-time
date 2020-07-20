import React,{useState} from 'react'

function ProjectForm (props){
    const [projectTypeId, setProjectTypeId] = useState(null);
    const [editProjectForm, setEditProjectForm] = useState(false);

    function addProject() {
        if(!document.getElementById('projectName').value){
            alert('Please fill in all details');
        } else{
            const projectName = document.getElementById('projectName').value;
            props.addProject(projectName, projectTypeId);
        }
    }

    function edit(e){
        e.preventDefault();
        setEditProjectForm(!editProjectForm);
    }

    return (
    <form >
        <h2>Project Form <button onClick={edit}>Edit</button></h2>
        <input type='text' id='projectName' placeholder = 'Project Name'/>
        <div>
            {props.projectTypes.map(projectType => 
                <span key={projectType.id}>
                    <input type='radio' name='projectTypes' value={projectType.id} 
                        onChange={(e) => setProjectTypeId(e.target.value)}/>
                    <label>{projectType.projectType}</label>
                    {editProjectForm && <button onClick={props.deleteProjectType} id={projectType.id}>x</button>}
                </span>
            )}         
        </div>
        <button onClick={(e) => {e.preventDefault(); addProject();}}>Submit</button>
    </form>
    )
}

export default ProjectForm;