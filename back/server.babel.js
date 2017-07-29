const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');

const app = express();
app.use(expressJwt({ secret: 'the real true secret' }).unless({ path: ['/', '/bundle.js', '/login', '/users'] }));
app.use(cookieParser());

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});

const io = require('socket.io').listen(server);

const TOKEN_KEY = 'auth_token';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

io.on('connection', (socket) => {
  const cookieParsed = cookie.parse(socket.request.headers.cookie);
  const credentials = jwt.decode(cookieParsed[TOKEN_KEY]);

  // TODO: process credentials, check if user exists, if not, add him to the list

  console.log('user connected');
  const user = credentials.username;
  socket.on('chat message', (msg) => {
    io.emit('message arrived', `${user}: ${msg}`);
  });
});
// app.all('*', (req, res) => res.sendFile(path.resolve(__dirname, '../public/index.html')));


app.get('/roomInfo', (req, res) => {
  res.status(200).send('thiы is the protected room info');
});

app.post('/login', (req, res) => {
  if (!req.body.username) {
    res.status(400).send('username required');
  }

  const { username, age, gender } = req.body;

  const token = jwt.sign({ username, age, gender }, 'the real true secret');
  res.cookie(TOKEN_KEY, token).sendStatus(200);
});

app.get('/room', (req, res) => res.sendFile(path.resolve(__dirname, '../public/index.html')));

app.get('/users', (req, res) => {
  res.json([{ username: 'Vasya', age: 15, gender: 'male' }]);
});
