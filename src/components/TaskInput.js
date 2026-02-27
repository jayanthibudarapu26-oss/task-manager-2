import React, { useState } from 'react';

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() === '') return;
    onAddTask(inputValue.trim(), dueDate);
    setInputValue('');
    setDueDate('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="input-section">
      <div className="input-row">
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleAdd}>+ Add</button>
      </div>
      <input
        type="date"
        className="date-input"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
    </div>
  );
}

export default TaskInput;