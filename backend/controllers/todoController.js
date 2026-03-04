const Todo = require("../models/Todo");

// Get all
exports.getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
};

// Create
exports.createTodo = async (req, res) => {
  const todo = await Todo.create({ title: req.body.title });
  res.status(201).json(todo);
};

// Update
exports.updateTodo = async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    // { new: true }
    { returnDocument: 'after' }
  );
  res.json(updated);
};

// Delete
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully" });
};
