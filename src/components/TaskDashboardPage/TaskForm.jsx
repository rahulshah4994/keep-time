import React,{useState} from 'react';

function TaskForm (props) {
    const [recurringSpan, setRecurringSpan] = useState(null)
    const days = ['S','M','T','W','T','F','S'];
    let recurringForm =null;
    let weekly = [0,1,2,3,4,5,6];
    let recurringData = weekly;

    const addTask = (e) => {
        e.preventDefault();
        if(!e.target.elements.taskName.value){
            alert('Please enter all details')
        } else {
            props.addTask(e.target.elements.taskName.value, recurringSpan, recurringData);
            e.target.elements.taskName.value = '';
        }
        
    }

    function selectWeekly (e){
        const value = parseInt(e.target.value);
        if(e.target.checked) {
            if(recurringData.findIndex(day => day===value)<0){
                recurringData.push(e.target.value);
                console.log(recurringData);
            }
        } else {
            recurringData = recurringData.filter(day => {return day !== value});
            console.log(recurringData);
        }
    }
        
    if(recurringSpan === 'weekly'){
        recurringData = weekly;
        recurringForm = (
            days.map((day,index) => {
                return ( 
                    <span key={index}>
                        <input type="checkbox" name="weekdays" defaultChecked onChange={selectWeekly} value={index}/>
                        <label>{day}</label>
                    </span>
                )}
            ))
        } else if (recurringSpan === 'monthly'){ 
            recurringData = [];
            recurringForm = null;
        } else if (recurringSpan === 'annually'){ 
            recurringData = [];
            recurringForm = null;
        } else if (recurringSpan === null){
            recurringData = [];
            recurringForm = null;
        }

    return(
        <form onSubmit={addTask}>
            <h2>Task Form</h2>
            <input type='text' name='taskName' placeholder='Task Name'/>
            <div>
                <input type='radio' name='isRecurring' label='One-Time' id='oneTime' defaultChecked value={false} onChange={()=> {setRecurringSpan(null)}}/>
                <label>One-Time</label>
                <input type='radio' name='isRecurring' label='Recurring'id='recurring' value={true} onChange={()=>{setRecurringSpan('weekly')}}/>
                <label>Recurring</label>            
            </div>
            <div>
                <input type='radio' name='recurringSpan' id='weekly' defaultChecked onChange={()=>{setRecurringSpan('weekly'); document.getElementById('recurring').checked = true; }}/>
                <label>Weekly</label>
                <input type='radio' name='recurringSpan' id='monthly' onChange={()=>{setRecurringSpan('monthly'); document.getElementById('recurring').checked = true;}}/>
                <label>Monthly</label>
                <input type='radio' name='recurringSpan' id='annually' onChange={()=>{setRecurringSpan('annually'); document.getElementById('recurring').checked = true;}}/>
                <label>Annually</label>
            </div>
            <div>
            {recurringSpan ? recurringForm : null}
                
            </div>
            
            <button>Submit</button>
        </form>
    )
}

export default TaskForm;