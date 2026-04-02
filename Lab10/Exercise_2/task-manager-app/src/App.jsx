import React, { useState } from 'react';

const ListItem = ({ item, onRemove }) => (
  <li style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
    <span>{item.text}</span>
    <button 
      onClick={() => onRemove(item.id)} 
      style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}
    >
      Remove
    </button>
  </li>
);

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask = {
      id: Date.now(),
      text: inputValue.trim()
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ddd' }}>
      <h3>My Task List</h3>

      <form onSubmit={addTask} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: '8px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '8px', marginLeft: '5px' }}>Add</button>
      </form>

      {tasks.length === 0 ? (
        <p style={{ color: 'gray', fontStyle: 'italic' }}>No tasks available. Add one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map((task) => (
            <ListItem 
              key={task.id}
              item={task} 
              onRemove={removeTask} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskManager;
