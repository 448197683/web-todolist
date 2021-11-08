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
  console.log(req.body);
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

app.delete('/delete', async (req, res) => {
  console.log(req.body);
  try {
    const delTodo = await db
      .collection('todos')
      .deleteOne({ _id: Number(req.body.delID) });
    console.log(delTodo);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});
