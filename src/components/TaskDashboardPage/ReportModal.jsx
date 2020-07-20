import React from 'react';
import {dailyDataRef} from '../../firebase/firebase'
import Modal from 'react-modal';

function ReportModal (props){
    const date = new Date();

    function submitReport (e){
        props.tasks.forEach(task => {
            dailyDataRef.add({
                date: date,
                task: task.name,
                taskId: task.id,
                time: task.time,
                description: document.getElementById(task.id).value
            }).then(console.log('Report submitted'))
            document.getElementById(task.id).value = '';
            e.preventDefault();
        })
    }

    return(
        <Modal
          isOpen={props.openReportModal}
          onRequestClose={props.closeReportModal}
          contentLabel="Report Modal"
        >
            <form>
                {props.tasks.map(task => (
                    task.isActive && <div key={task.id}>
                        <h3>{task.name}: {task.time}</h3>
                        <input type='text' id={task.id}/>
                    </div>
                ))}
                {props.projects.map(project => (
                    <div key={project.id} >
                        {project.tasks.map((task, index)=> {
                            if(task.isActive){
                                return(
                                    <div key={project.id + '_' + task.taskName}>
                                        <h4>{project.projectName}- {task.taskName}: {task.time}</h4>
                                        <input type='text' name={project.id} id={task.name}/> 
                                    </div>
                                )
                            } else {return null}
                        })}
                    </div> 
                    ))}                       
                <button onClick={submitReport}>Submit Report</button>
            </form>
        </Modal>
    )
}

export default ReportModal;