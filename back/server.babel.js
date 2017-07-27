const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const app = express();
app.use(expressJwt({ secret: 'the real true secret' }).unless({ path: ['/login', '/users'] }));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});

const io = require('socket.io').listen(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('user connected');
  const user = socket.handshake.query.username;
  socket.on('chat message', (msg) => {
    io.emit('message arrived', `${user}: ${msg}`);
  });
});
// app.all('*', (req, res) => res.sendFile(path.resolve(__dirname, '../public/index.html')));


app.get('/roomInfo', (req, res) => {
  res.status(200).send('thie is the protected room info');
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.post('/login', (req, res) => {
  if (!req.body.username) {
    res.status(400).send('username required');
  }
  const token = jwt.sign({ username: req.body.username }, 'the real true secret');
  res.status(200).send(token);
});

app.get('/room', (req, res) => res.sendFile(path.resolve(__dirname, '../public/index.html')));

app.get('/users', (req, res) => {
  res.json([{ username: 'Vasya', age: 15, gender: 'male' }]);
});
