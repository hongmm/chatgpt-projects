import React, { useState } from "react";

const Bard = () => {
  const [tasks, setTasks] = useState([]);

  // This function adds a new task to the to-do list.
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
      <form onSubmit={(e) => {
          e.preventDefault();
          addTask(e.target.task.value);
        }}>
        <input type="text" name="task" placeholder="Enter a task"/>
        <input type="submit" value="Add Task"/>
      </form>
    </div>
  );
};

export default Bard;
