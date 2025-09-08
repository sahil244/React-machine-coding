import React, { useState } from 'react';

// Child: Single Todo
export function TodoItem({
  todo,
  editing,
  setEditing,
  toggleTodo,
  deleteTodo,
  saveEdit,
}) {
  const isEditing = editing?.id === todo.id;

  return (
    <li style={{ display: 'flex', gap: 8, marginTop: 8 }}>
      {isEditing ? (
        <>
          <input
            value={editing.text}
            onChange={(e) => setEditing({ ...editing, text: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit();
              if (e.key === 'Escape') setEditing(null);
            }}
            style={{ flex: 1, padding: 6 }}
          />
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setEditing(null)}>Cancel</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleTodo(todo.id)}
          />
          <span
            style={{
              flex: 1,
              textDecoration: todo.done ? 'line-through' : 'none',
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => setEditing({ id: todo.id, text: todo.text })}>
            Edit
          </button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </>
      )}
    </li>
  );
}
