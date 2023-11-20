import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom";
import  './css/TasksForm.css';


const EMPTY_TASK = {
    id: "",
    name:"",
    description:"",
    status:"Started"
}

export function TasksForm(){
    const [currentTask, setCurrentTask] = useState(EMPTY_TASK);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        async function load(){
            if(id != 'new'){
                const response = await fetch(`http://localhost:4000/tasks/${id}`)
            const data = await response.json();
            setCurrentTask(data);
            }  
        }
        load();
    },[])

    async function insert(task){
        const response = await fetch(`http://localhost:4000/tasks`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(task)
        })
        if(response.status == 201){
            const data = await response.json();
            setCurrentTask(data);
            alert(`Succesfully created task!`);
        }else{
            alert("Error create task!");
        }
    }

    async function update(task){
        const response = await fetch(`http://localhost:4000/tasks/${task.id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(task)
        })
        if(response.status == 204 || response.status == 200 ){
            alert("Task updated!");
        }else{
            alert("Error updated task!");
        }
    }

    async function onSaveHandler(){
        if(currentTask.id){
            await update(currentTask);
        }else{
            await insert(currentTask);
        }

        navigate(`/tasks`)
    }

    function setField(event){
        const field =  event.target.name;
        const value = event.target.value;
        setCurrentTask({
            ...currentTask,
            [field]:value
        });
    }

    const setStatusField = (event) => {
        setCurrentTask({
            ...currentTask,
            status: event.target.value
        });
    }

    return(
       <div className="task-form">
            <h3>Create a task 📒</h3>
            <label>Task ID</label>
            <input name="id" value={currentTask.id} onChange={setField} readOnly className="not-allowed"/>
            <label>Task Name</label>
            <input 
                name="name" 
                value={currentTask.name} 
                onChange={setField}
            />
            <label>Description</label>
            <input 
                name="description" 
                value={currentTask.description} 
                onChange={setField} 
            />
            
            <label for="status">Status</label>
            <select id="status" name="status" value={currentTask.status} onChange={setStatusField}>
                <option value="Started">Started</option>
                <option value="Done">Done</option>
            </select>

            <button className="btn-save" onClick={onSaveHandler}>Save</button>
       </div>
    )
}