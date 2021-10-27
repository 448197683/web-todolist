import express from 'express';
import path from 'path';
import { db } from './db.js';

export const app = express();

app.use(express.static(path.resolve('public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  console.log(path.resolve('public', 'html', 'index.html'));
  res.status.sendFile(path.resolve('public', 'html', 'index.html'));
});

app.get('/todolist', (req, res) => {
  res.status(200).sendFile(path.resolve('public', 'html', 'todo.html'));
});

app.post('/todolist', async (req, res) => {
  console.log(req.body);
  const saveTodo = await db
    .collection('todos')
    .insertOne({ todo: req.body.todo });
  console.log(saveTodo);
});
