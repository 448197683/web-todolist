import express from 'express';
import path from 'path';
import { db } from './db.js';

export const app = express();

app.use(express.static(path.resolve('public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).render('index.ejs');
});

app.get('/todo', (req, res) => {
  res.status(200).render('todo.ejs');
});

app.post('/todo', async (req, res) => {
  console.log(req.body);
  const saveTodo = await db
    .collection('todos')
    .insertOne({ todo: req.body.todo });
  res.redirect('/list');
});

app.get('/list', async (req, res) => {
  const todolists = await db.collection('todos').find().toArray();
  res.status(200).render('list.ejs', { todolists });
});
