import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.resolve('public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  console.log(path.resolve('public', 'html', 'index.html'));
  res.sendFile(path.resolve('public', 'html', 'index.html'));
});

app.get('/todolist', (req, res) => {
  res.sendFile(path.resolve('public', 'html', 'todo.html'));
});

app.post('/todolist', (req, res) => {
  console.log(req.body);
});

app.listen(8080, () => {
  console.log(`💚 Server is listening on Port 8080`);
});
