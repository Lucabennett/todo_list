import React from "react";

const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodo }) => {

  return (
    <li style={{ margin: "10px 0" }}>
      <span
        onClick={() => toggleComplete(todo._id, todo.completed)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",
          marginRight: "10px"
        }}
      >
        {todo.title}
      </span>

      <button onClick={() => editTodo(todo)}>Edit</button>
      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
