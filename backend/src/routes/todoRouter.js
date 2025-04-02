import { Router } from 'express';
import { isAdmin, verifyToken } from '../middleware/auth.js';
import Todo from '../models/todo.model.js';

const todoRouter = Router();

todoRouter.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({ title, description, status: 'pending' });
    todo.save();

    res.status(200).json({ message: 'Todo created' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
  }
});

todoRouter.get('/', verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

export default todoRouter;
