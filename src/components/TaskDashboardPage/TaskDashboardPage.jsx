import React from 'react';
import {useState, useEffect} from 'react';
import TaskForm from './TaskForm';
import ProjectForm from './ProjectForm.jsx';
import ProjectTypeForm from './ProjectTypeForm';
import {tasksRef, projectTypesRef, projectsRef} from '../../firebase/firebase';
import TaskOptions from './TaskOptions';
import TaskList from './TaskList';
import ReportModal from './ReportModal';
import ProjectTaskList from './ProjectTaskList';
import ProjectOptions from './ProjectOptions'

function TaskDashboardPage () {
    const [tasks, setTasks] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [projects, setProjects] = useState([]);
    const [openReportModal, setOpenReportModal] = useState(false);

//Grab data from the database
    useEffect(() => {
        console.log('effect started');
        getData();
        console.log('effect ended');
        // eslint-disable-next-line
        },[]
    )

//Set projects and tasks from the database
    async function getData () {
        try{
        const tempT = await tasksRef.get();
        const tempPT = await projectTypesRef.get();
        const tempP = await projectsRef.get();
        const dbtasks = [];
        const dbprojectTypes = [];
        const dbprojects = [];

        tempT.forEach(task => {
            console.log(task.data());
            dbtasks.push({id: task.id, ...task.data()});
        });
        setTasks([...dbtasks]);
        console.log(dbtasks, tasks);

        tempPT.forEach(projectType => {
            // console.log(projectType.data())
            dbprojectTypes.push({id:projectType.id, ...projectType.data()});
        });
        setProjectTypes([...dbprojectTypes]);
        // console.log(dbprojectTypes, projectTypes);
    
        tempP.forEach(project =>{
            dbprojects.push({id: project.id, ...project.data()});            
        });
        setProjects([...dbprojects]);
        console.log(dbprojects, projects)
    } catch (e) {console.log('Error: ', e)}
}

//Create a new task and add it to the database
    const addTask = (task, recurringSpan, recurringData) => {
        const newTask = tasksRef.add({
            name: task, 
            recurringSpan: recurringSpan, 
            recurringData: recurringData,
            time: 0,
            isComplete: false,
            isActive: false
        }).then(console.log('Task added')).catch((e)=> console.log(e))

        setTasks( (p) => [...p, {
            id: newTask.id, 
            name: task, 
            recurringSpan: recurringSpan, 
            recurringData: recurringData,
            time: 0,
            isComplete: false,
            isActive: false
        }]);
        console.log(tasks);    
        }

//create a new project using the project type and project name and add it to the database
    async function addProject (projectName, projectTypeId){
        const index = projectTypes.findIndex(projectType => {return projectType.id === projectTypeId});
        console.log(index);
        const projectTasks = projectTypes[index].projectTasks;
        console.log(projectTasks)
        const tasksArray = projectTasks.map( projectTask => (
            {
                taskName: projectTask,
                time: 0,
                isComplete: false,
                isActive: false
            })
        )
        console.log(tasksArray);
        const newProject = await projectsRef.add({
            projectName: projectName, 
            projectType: projectTypes[index].projectType,
            tasks: tasksArray,
            createdOn: new Date()
        });
        setProjects(p => {
            return [
                ...p, {
                    id: newProject.id,
                    projectName: projectName, 
                    projectType: projectTypes[index].projectType,
                    tasks: tasksArray,
                    createdOn: new Date()
                }]
            });
        console.log(projects);
    }

//Add a new ProjectTask to the database as well as the state

    async function addProjectTask(projectId, taskName){
        console.log(projectId, taskName)
        const temp = projects;
        const index = temp.findIndex(project => {return project.id === projectId});
        console.log(index);
        temp[index].tasks.push({
            isActive: false,
            isComplete: false,
            taskName: taskName,
            time: 0
        });
        setProjects([...temp]);
        console.log(temp[index].tasks)
        console.log('add project task');
    }

//Add a new Project Type to the database as well as the projectTypes state

    async function addProjectType (projectType, projectTasks) {
        console.log('AddProjectType initiated')
        try {
            const newProjectType = await projectTypesRef.add({
                projectType: projectType, 
                projectTasks: projectTasks
            })
            console.log(newProjectType.id);
            setProjectTypes(p=> [
                ...p,{
                id:newProjectType.id,
                projectType: projectType,
                projectTasks: projectTasks
                }]);
            console.log(projectTypes);
        } catch (e) {console.log(e)}
    }

//Delete project type from the database

    async function deleteProjectType(e){
        console.log(e.target.id.toString());
        const idString = e.target.id.toString();
        console.log(idString);
        await projectTypesRef.doc(idString).delete();
        console.log('Deleted from database successfully');
    }

//Delete project from database

    async function deleteProject (projectId){
        await projectsRef.doc(projectId).delete();
        getData();
    }

//Delete a task from the database
    async function deleteTask(taskId){
        await tasksRef.doc(taskId).delete();
        getData();
    }

//Update the changed time in the tasks state => not in the database
    function updateTime(id, time, checked) {
        const temp = tasks;
        const index = temp.findIndex(task => {return task.id === id});
        const newTime = checked ? temp[index].time + time : temp[index].time - time;
        temp[index] = {...temp[index], time: newTime}
        setTasks([...temp]);
    }

//Update the changed time to Project Tasks in the database
    function updateProjectTime(id, task, ptime, checked){
        const temp = projects;
        const index = temp.findIndex(project => {return project.id === id});
        // console.log(index);
        // console.log(temp[index].tasks)
        //temp[index].tasks.forEach(task => {console.log(task.taskName)});
        const taskIndex = temp[index].tasks.findIndex(t => {return t.taskName === task});
        // console.log(task);
        // console.log(taskIndex);
        const newTime = checked ? temp[index].tasks[taskIndex].time + ptime : temp[index].tasks[taskIndex].time - ptime ;
        temp[index].tasks[taskIndex].time = newTime;
        setProjects([...temp]);
    }

//Set task to isActive and add it to today's list
    function taskIsActive (e){
        const temp = tasks;
        const index = temp.findIndex(task=> {return task.id === e.target.value});
        temp[index].isActive = !temp[index].isActive;
        setTasks([...temp]);
    }

///Set projectTask to isActive and add it to today's list
    function projectTaskIsActive(e) {
        const temp = projects;
        const index = temp.findIndex(project => project.id === e.target.id);
        const taskIndex = temp[index].tasks.findIndex(task => task.taskName === e.target.value);
        temp[index].tasks[taskIndex].isActive = !temp[index].tasks[taskIndex].isActive;
        setProjects([...temp]);
        console.log(taskIndex, temp[index].tasks[taskIndex]);
    }

    return(
            <div>
                <TaskForm addTask={addTask}/>
                <ProjectForm addProject={addProject} projectTypes={projectTypes} deleteProjectType={deleteProjectType}/>
                <ProjectTypeForm addProjectType={addProjectType}/>
                <ProjectOptions projects={projects} deleteProject = {deleteProject} addProjectTask={addProjectTask} projectTaskIsActive={projectTaskIsActive}/>
                <TaskOptions tasks={tasks} deleteTask={deleteTask} taskIsActive={taskIsActive}/>
                <ProjectTaskList projects={projects} updateProjectTime={updateProjectTime} />
                <TaskList tasks={tasks} updateTime={updateTime}/>
                <button onClick = {()=>setOpenReportModal(true)}>End Day</button>
                <ReportModal tasks={tasks} projects={projects} openReportModal={openReportModal} closeReportModal={()=>setOpenReportModal(false)}/>
            </div>                  
    )
}

export default TaskDashboardPage;