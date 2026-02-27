import React, { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDate, setEditDate] = useState(task.dueDate || '');

  const handleSave = () => {
    if (editText.trim() === '') return;
    onEdit(task.id, editText.trim(), editDate);
    setIsEditing(false);
  };

  const isOverdue = task.dueDate && !task.completed &&
    new Date(task.dueDate) < new Date().setHours(0, 0, 0, 0);

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <input
            type="date"
            className="edit-date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
          <button className="save-btn" onClick={handleSave}>💾</button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>✕</button>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <div className="task-info">
            <span className="task-text">{task.text}</span>
            {task.dueDate && (
              <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                📅 {isOverdue ? '⚠️ Overdue · ' : ''}{task.dueDate}
              </span>
            )}
          </div>
          <span className={`badge ${task.completed ? 'done' : 'pending'}`}>
            {task.completed ? 'Done' : 'Pending'}
          </span>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>✏️</button>
          <button className="delete-btn" onClick={() => onDelete(task.id)}>🗑</button>
        </>
      )}
    </div>
  );
}

export default TaskItem;