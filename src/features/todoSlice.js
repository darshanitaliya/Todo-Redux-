import { createSlice } from "@reduxjs/toolkit";

const initialState=
    {
    todolist:[
    {id:1,title:"Task 1",status:false},
    {id:2,title:"Task 2",status:false}
    ]
    }

const todoSlice=createSlice({
    name:"todos",
    initialState,
    reducers:{
        addTask(state,action){
            state.todo.push(action.payload)
        },
        deleteTask(state,action){
            state.todo=state.todo.filter(item=>item.id!==action.payload.id)
        },
        newState(state,action){
            state.todo=action.payload;
        },
    }
})

export const { addTask,deleteTask,newState }=todoSlice.actions;

export default todoSlice.reducer;