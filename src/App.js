import React, { useState } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    return savedTasks || [];
  });
  const [filter, setFilter] = useState('All');

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  const handleToggle = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updated = tasks.filter(task => task.id !== id);
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="app">

      {/* Floating books */}
      <span className="floaty" style={{top:'8%', left:'3%', animationDuration:'5s'}}>📚</span>
      <span className="floaty" style={{top:'75%', left:'88%', animationDuration:'6s', animationDelay:'1s'}}>📖</span>
      <span className="floaty" style={{top:'40%', left:'91%', animationDuration:'4s', animationDelay:'2s'}}>🎧</span>
      <span className="floaty" style={{top:'20%', left:'90%', animationDuration:'7s', animationDelay:'0.5s'}}>✏️</span>

      {/* Flying paper planes */}
      <span className="plane" style={{top:'15%', animationDuration:'8s', animationDelay:'0s'}}>✈️</span>
      <span className="plane" style={{top:'55%', animationDuration:'11s', animationDelay:'4s'}}>✈️</span>
      <span className="plane" style={{top:'80%', animationDuration:'9s', animationDelay:'7s'}}>✈️</span>

      <h1>Task Manager</h1>
      <p className="subtitle">Stay organised, stay productive</p>

      <TaskInput onAddTask={handleAddTask} />

      <div className="filters">
        {['All', 'Pending', 'Completed'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      <p className="stats">
        <span>{completedCount}</span> of <span>{tasks.length}</span> tasks completed
      </p>
    </div>
  );
}

export default App;