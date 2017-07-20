const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});

const io = require('socket.io').listen(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('chat message', (msg, fn) => {
    console.log(`message: ${  msg}`);
    fn(msg);
  });
});
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
