import React from "react";
import PropTypes from 'prop-types';

const TaskList = ( { todos,deleteTask } ) => {

    return (

        <ul className="list-group">
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
    )
}

TaskList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
            done: PropTypes.bool
        })
    )
}

export default TaskList;