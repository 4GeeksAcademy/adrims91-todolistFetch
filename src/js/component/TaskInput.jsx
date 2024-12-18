import React from "react";
import PropTypes from 'prop-types';


const TaskInput = ( {inputValue, setInputValue, addTask} ) => {

    return (
      <ul className="list-group mb-2">
        <input
              className="text-center list-group-item"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Insert a new task"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
            />
      </ul>
    )
}

TaskInput.propTypes = {
    inputValue: PropTypes.string.isRequired,
    setInputValue: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired
}

export default TaskInput;