import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faPen,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import './App.css';

import { addTask, deleteTask, newState } from './features/todoSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const todo=useSelector(state=>state.todos);
  // console.log('todo',todo)
  const dispatch=useDispatch();


  
  // Temp State
  const [newTask,setNewTask]=useState('');
  const [updateData,setUpdateData]=useState('');
  const [highlighter,setHighlighter]=useState('');

  // Functions

  // mark done
  const markDone=(id)=>{
    let first=[],second=[],temp;

    todo.todo.map((task)=>{
      if(task.id===id){
        temp={
          id:task.id,
          title:task.title,
          status:!task.status
        }
      }
      return null;
    })

    let newTask=todo.todo.filter(task=>task.id!==id)

    temp.status?second.push(temp):first.push(temp);
    for(let i=0;i<newTask.length;i++){
      if(newTask[i].status===false){
        first.push(newTask[i]);
      }
      else if(newTask[i].status===true){
        second.push(newTask[i]);
      }
    }

    newTask.length=0;
    for(let i=0;i<first.length;i++) newTask.push(first[i])
    for(let i=0;i<second.length;i++) newTask.push(second[i])

    dispatch(newState(newTask));

  }

  // cancle update
  const cancleUpdate=()=>{
    setUpdateData('');
    setHighlighter('');
  }

  // change task (Edit)
  const changeTask=(e)=>{
    let newEntry={
      id:updateData.id,
      title:e.target.value,
      status:updateData.status
    }
    setUpdateData(newEntry);
  }

  // update task
  const updateTask=()=>{
    let filterPart=[...todo.todo].filter(task=>task.id!==updateData.id);
    dispatch(newState([updateData,...filterPart]));
    setUpdateData('');
    setHighlighter('');
  }

  // handle enter key
  const handleKeyDown=(e)=>{
    if(e.key==='Enter' && newTask.trim()){
      dispatch(addTask({id:nanoid(),title:newTask,status:false}));
      setNewTask('');
    }
    
  }

  return (
    <div className="container App">
      <br />
      <br />
      <h2>To Do List</h2>
      <br />
      <br />

      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input value={updateData && updateData.title} onChange={e=>changeTask(e)} type="text" className="form-control form-control-lg" />
            </div>
            <div className="col-auto">
              <button className='btn btn-success btn-lg mr-20' onClick={updateTask}>Update</button>
              <button className='btn btn-warning btn-lg' onClick={cancleUpdate}>Cancle</button>
            </div>
          </div>
          <br />
        </>
      ):
      (
        <>
          <div className='row'>
            <div className='col'>
              <input 
              value={newTask}
              onChange={e=>setNewTask(e.target.value)}
              className='form-control form-control-lg'
              onKeyDown={handleKeyDown}/>
            </div>
            <div className='col-auto'>
              <button onClick={()=>
                {
                  if(newTask.trim()) dispatch(addTask({id:nanoid(),title:newTask,status:false}));
                  setNewTask('');
                } } className='btn btn-success btn-lg '>Add Task</button>
            </div>
          </div>
          <br />
        </>
      )}

      {todo && todo.todo.length?'':'Add Tasks...'}

      {todo && todo.todo
      .map(
        (task,index)=>{
          return(
            <>
              <div className={task.id===highlighter?'col taskbg update':'col taskbg'}>
                <div>
                  <span className='taskNumber'>{index+1}</span>
                  <span className={task.status ? 'tasktext done': 'tasktext'}>{task.title}</span>
                </div>

                <div className="iconWrap">
                  <span onClick={()=>markDone(task.id)}>
                    <FontAwesomeIcon icon={faCircleCheck}/>
                  </span>
                  {task.status?null:
                  <span onClick={()=>{setUpdateData({
                    id:task.id,
                    title:task.title,
                    status:task.status
                  });
                  setHighlighter(task.id)}}>
                    <FontAwesomeIcon icon={faPen}/>
                  </span>}
                  <span onClick={()=>dispatch(deleteTask({id:task.id}))}>
                    <FontAwesomeIcon icon={faTrashCan}/>
                  </span>
                </div>
              </div>
            </>
          )
        }
      )}

    </div>
  );
}

export default App;
