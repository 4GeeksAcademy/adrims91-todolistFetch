import React, { useEffect, useState } from "react";
import TaskInput from "./TaskInput";

const App = () => {

    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [user, setUser] = useState('ambrosio');


    const createUser = async () => {
      const newUser = {
        name: user,
        todos: []
      }
      try{
        await fetch(`https://playground.4geeks.com/todo/users/${user}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
        
        }catch(error){
          console.error('Error creating user', error)
        }
    }

    const fetchTasks = async () => {
        try{
            const response = await fetch(`https://playground.4geeks.com/todo/users/${user}`)
            if (!response.ok){
              console.log(`Username created: ${user}`)
              createUser()
            }else {
              const data = await response.json()
              setTodos(data.todos)
            }
        }catch(error){
            console.error('Error, could not fetch the tasks', error)
        }
    }

    const addTask = async () => {
        if (inputValue.trim() !== ''){
            const newTask = {
                label: inputValue,
                done:false
            }
        try{
            const response = await fetch('https://playground.4geeks.com/todo/todos/ambrosio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })
            if (response.ok){
              fetchTasks()
              setInputValue('')
            }
            
        }catch(error){
            console.error('Error, could not add a new task', error)
        }
    }
    }

    const deleteTask = async (id) => {
      try {
        console.log(`Deleting task with ID: ${id}`);

        const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          console.log('Task deleted successfully');
          setTodos(todos.filter((_, i) => i !== id));
          fetchTasks()
        } else {
          const errorText = await response.text();
          console.error('Error, could not delete any task:', response.statusText, errorText);
        }
      } catch (error) {
        console.error('Error, could not delete any task:', error);
      }
    };

    const deleteAll = async () => {
      try {
        const response = await fetch(`https://playground.4geeks.com/todo/users/${user}`, {
          method: 'DELETE',
        })
        if (response.ok){
          setTodos([])
          createUser()
        }
      }catch(error){
        console.error('Error, could not delete all tasks', error)
      }
    } 
    

    useEffect(() => {
        fetchTasks()
    }, [])

  return (
    <>
      <div className="container text-center">
        <h1 className="p-3" style={{ backgroundColor: "cyan" }}>
          My tasks List
        </h1>
        <ul className="list-group">
          
            <TaskInput 
            inputValue={inputValue}
            setInputValue={setInputValue}
            addTask={addTask}
            />

          {todos.map((item) => (
            <li 
            key={item.id}
            className="list-group-item">
            <b
              style={{ textTransform: "capitalize" }}
            >
              {item.label.toLowerCase()}
            </b>
            <i
              onClick={() => {
                const deleteAnswer = prompt("Do you want to delete the task? Yes/No");
                return deleteAnswer.toLowerCase() === "yes" ? deleteTask(item.id) : "";
              }}
              style={{ float: "right", cursor: "pointer" }}
              className="fa-solid fa-minus"
            ></i>
          </li>
          ))}
          <label
            className={`list-group-item ${
              todos.length === 0 ? "text-danger" : "text-success"
            }`}
            style={{ fontSize: "11px" }}
          >
            {todos.length === 0
              ? "No tasks, add a new task."
              : `${todos.length} tasks.`}
          </label>
        </ul>
      </div>
      <div className="d-flex justify-content-center m-5">
        <button
        className="btn btn-danger"
        onClick={deleteAll}>
              Burn all tasks!
        </button>
      </div>
    </>
  );
};

export default App;
