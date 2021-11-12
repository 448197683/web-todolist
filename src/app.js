import express from 'express';
import path from 'path';
import { db, counter } from './db.js';

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
  try {
    const saveTodo = await db.collection('todos').insertOne({
      todo: req.body.todo,
      createdAt: req.body.createdAt,
      _id: counter.count + 1,
    });
    counter.count = counter.count + 1;
    const addConunter = await db
      .collection('counter')
      .updateOne({ name: 'counter' }, { $set: { count: counter.count } });
    return res.redirect('/list');
  } catch (error) {
    console.log(error);
  }
});

app.get('/list', async (req, res) => {
  try {
    const todolists = await db.collection('todos').find().toArray();
    console.log(todolists);
    res.status(200).render('list.ejs', { todolists });
  } catch (error) {
    console.log(error);
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const delTodo = await db
      .collection('todos')
      .deleteOne({ _id: Number(req.params.id) });
    console.log(delTodo);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

app.get(`/description/:id`, async (req, res) => {
  const getTodo = await db
    .collection('todos')
    .findOne({ _id: Number(req.params.id) });
  console.log(getTodo);
  if (!getTodo) {
    return res.status(403).render('403.ejs');
  }
  res.status(200).render('description.ejs', { todolist: getTodo });
});

app.put('/description/:id', async (req, res) => {
  console.log(req.params, req.body);
  try {
    const editTodo = await db
      .collection('todos')
      .updateOne(
        { _id: Number(req.params.id) },
        { $set: { todo: req.body.value } }
      );
    res.status(200).end();
  } catch (error) {
    console.log(error);
  }
  console.log(editTodo);
});
