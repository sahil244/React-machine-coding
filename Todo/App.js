import React, { useState } from 'react';
import { TodoItem } from './components/TodoItem';
export default function TodoApp() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null); // {id, text} or null

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setInput('');
  };

  const toggleTodo = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  const saveEdit = () => {
    const text = editing.text.trim();
    if (!text) deleteTodo(editing.id);
    else setTodos(todos.map((t) => (t.id === editing.id ? { ...t, text } : t)));
    setEditing(null);
  };

  return (
    <div
      style={{ maxWidth: 400, margin: '20px auto', fontFamily: 'sans-serif' }}
    >
      <h2>Todo App</h2>

      <input
        value={input}
        placeholder="Enter todo"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        style={{ padding: 6, width: '70%' }}
      />
      <button onClick={addTodo}>Add</button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            editing={editing}
            setEditing={setEditing}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            saveEdit={saveEdit}
          />
        ))}
      </ul>
    </div>
  );
}
