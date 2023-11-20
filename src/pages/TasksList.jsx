import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  './css/TasksList.css';

export function TasksList(){

    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    async function remove(id){
        const response = await fetch(`http://localhost:4000/tasks/${id}`,{
            method:"DELETE"
        })
        if(response.status == 204 || response.status == 200 ){
            alert("Task deleted with successfull!");
        }else{
            alert("Error on deleting the current task!");
        }
    }

    async function onRemoveHandler(id){
       const ok =  window.confirm("Are you want to delete this task?");
       if(ok){
        await remove(id);
        await load();
       }
    }

    async function onEditHandler(id){
        const ok =  window.confirm("Are you want to edit this task?");
        if(ok){
         navigate(`/tasks/${id}`);
        }
     }

    async function onCreateHandler(){
        navigate(`/tasks/new`);
    }

    async function load(){
        const response = await fetch('http://localhost:4000/tasks');
        const data = await response.json();
        setTasks(data);
    }

    useEffect(()=>{
        load();
    },[])

    return (
        <div className="task-list">
            <h1>Tasks list 📒</h1>
            {/* <Link to="/tasks/new" >New</Link> */}
            <button type="button" onClick={()=>onCreateHandler()}>Create Task</button>
            <table>
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                {tasks.map((tasks)=>{
                    return (
                        <tr>
                            <td>{tasks.id}</td>
                            <td>{tasks.name}</td>
                            <td>{tasks.description}</td>
                            <td>{tasks.status}</td>
                            <td><span style={{color:"red"}} onClick={()=>onRemoveHandler(tasks.id)}>Remove</span></td>
                            <td><span style={{color:"blue"}} onClick={()=>onEditHandler(tasks.id)}>Edit</span></td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    )
}