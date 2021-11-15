import { time } from 'console';
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
  const currentTime = Math.floor(new Date().getTime() / (1000 * 60)); // seconds
  try {
    const saveTodo = await db.collection('todos').insertOne({
      todo: req.body.todo,
      createdAt: currentTime,
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

const createdAt = (oldTime) => {
  const currentTime = Math.floor(new Date().getTime() / (1000 * 60));
  const calTime = currentTime - oldTime;
  let resultTime;
  if (calTime < 60) {
    return `${calTime < 2 ? `1 minute ago` : `${calTime} minutes ago`}`;
  } else if (calTime >= 60 && calTime < 60 * 24) {
    resultTime = Math.floor(calTime / 60);
    return `${resultTime < 2 ? `1 hour aog` : `${resultTime}hours ago`}`;
  } else if (calTime >= 60 * 24 && calTime < 60 * 24 * 30) {
    resultTime = Math.floor(calTime / (60 * 24));
    return `${resultTime < 2 ? `1 day ago` : `${resultTime} days ago`}`;
  } else if (calTime >= 60 * 24 * 30 && calTime < 60 * 24 * 30 * 12) {
    resultTime = Math.floor(calTime / (60 * 24 * 30));
    return `${resultTime < 2 ? `1 month ago` : `${resultTime} months ago`}`;
  } else {
    resultTime = Math.floor(calTime / (60 * 24 * 30 * 12));
    return `${resultTime < 2 ? `1 year aog` : `${resultTime} years ago`}`;
  }
};

app.get('/list', async (req, res) => {
  const createdAtArray = [];
  try {
    const todolists = await db.collection('todos').find().toArray();
    todolists.forEach((todolist) => {
      createdAtArray.push(createdAt(todolist.createdAt));
    });
    console.log(createdAtArray);
    res.status(200).render('list.ejs', { todolists, createdAtArray });
  } catch (error) {
    console.log(error);
  }
});

app.delete('/description/:id', async (req, res) => {
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
        { $set: { todo: req.body.value, createdAt: new Date().getTime() } }
      );
    res.status(200).end();
  } catch (error) {
    console.log(error);
  }
});
