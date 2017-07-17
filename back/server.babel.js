const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.all('*', (req, res) => res.sendFile(path.resolve(__dirname, '../public/index.html')));

app.post('/', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.post('/login', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.get('/room', (req, res) => res.sendFile(path.resolve(__dirname, '../public/index.html')));

app.get('/users', (req, res) => {
  res.json([{ username: 'Vasya', age: 15, gender: 'male' }]);
});


app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});
