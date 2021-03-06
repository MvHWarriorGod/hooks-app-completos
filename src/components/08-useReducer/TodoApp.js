import React from 'react';
import { useReducer } from 'react';
import { useEffect } from 'react/cjs/react.development';
// import { useForm } from '../hooks/useForm';
import './style.css';
import { TodoAdd } from './TodoAdd';
import { TodoList } from './TodoList';
import { todoReducer } from './todoReducer';

// const initialSate=[{
//     id:new Date().getTime(),
//     desc:'Aprender React',
//     done:false
// }];
const init=()=>{
    return JSON.parse(localStorage.getItem('todos'))||[];
}

export const TodoApp = () => {
    const [todos,dispatch]=useReducer(todoReducer,[],init);
    
    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(todos))
    },[todos]);


    const handleDelete=(todoId)=>{
       
        const action={
            type:'delete',
            payload:todoId
        }
        dispatch(action);
        console.log(todoId)
        
    }
    const handleToggle=(todoId)=>{
        dispatch({
            type:'toggle',
            payload:todoId
        })
    }
    const handleAddTodo=(newTodo)=>{
        dispatch({
            type:'add',
            payload:newTodo
        });
    }
    //console.log(description);
    
    return (
        <div>
            <h1>TodoApp ({todos.length})</h1>
            <hr/>
            <div className='row'>
                <div className='col-7'>
                    Todos
                    <TodoList todos={todos} handleDelete={handleDelete}
                    handleToggle={handleToggle} />
                </div>
                <div className='col-5'>
                   <TodoAdd handleAddTodo={handleAddTodo} />
                </div>
            </div>
           
        </div>
    )
}
