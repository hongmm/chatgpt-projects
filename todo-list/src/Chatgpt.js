import React, { useState } from 'react';

const Chatgpt = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEdit = (index, newTodo) => {
    setTodos(todos.map((todo, i) => (i === index ? newTodo : todo)));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDelete(index)}>Delete</button>
            <button onClick={() => handleEdit(index, prompt('Edit to-do', todo))}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chatgpt;
