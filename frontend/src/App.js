import React, { useEffect, useState } from "react";
import API from "./api";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  // console.log(privateKey);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await API.get("/");
    setTodos(res.data);
    
  };

  const addTodo = async (title) => {
    const res = await API.post("/", { title });
    setTodos([res.data, ...todos]);
  };

  const toggleComplete = async (id, completed) => {
    const res = await API.put(`/${id}`, { completed: !completed });
    setTodos(todos.map(t => t._id === id ? res.data : t));
  };

  const deleteTodo = async (id) => {
    await API.delete(`/${id}`);
    setTodos(todos.filter(t => t._id !== id));
  };

  const editTodo = async (todo) => {
    const newTitle = prompt("Edit task:", todo.title);
    if (!newTitle) return;
    const res = await API.put(`/${todo._id}`, { title: newTitle });
    setTodos(todos.map(t => t._id === todo._id ? res.data : t));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div style={{ width: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>MERN To-Do App</h2>

      <TodoForm addTodo={addTodo} />

      <div style={{ margin: "20px 0" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;
