import React from "react";
import TodoItem from "./TodoItem";
import { deleteData, checkData } from "./api/Apis";



const TodoList = ({todoList, setTodoList}) => {
  const deleteTodo = async (id) => {
    const deleted = await deleteData(id) 
    if (deleted) {
      setTodoList((prevTodoList) => prevTodoList.filter((todo) => todo.id !== id));;
    }
  };

  const toggleComplete = async (id) => {
    const checked = await checkData(id)
    if(checked) { 
      setTodoList((prevTodoList) => {
        prevTodoList.map((todo) => {
          return todo.id === id ? {...todo, isComplete: !todo.isComplete }: todo
        })
      })
    }
    const updatedTodoList = todoList.map((todo) => 
    todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setTodoList(updatedTodoList);
    
  };

  return(
    <div className='w-96 text-lg flex flex-col justify-center items-center bg-white  rounded-lg shadow-lg'>
      <ul className='w-full'>
        {todoList.map((todoItem) => (
          <TodoItem 
          key={todoItem.id} 
          todoItem={todoItem} 
          deleteTodo={deleteTodo} 
          toggleComplete={toggleComplete}

          />
        ))}
      </ul>
  </div>
  );
};
export default TodoList;



