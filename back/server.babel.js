import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import cookieParser from 'cookie-parser';
import chatRoom from './chatRoom';
import { TOKEN_KEY } from './constants';


const app = express();

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});

// Initialize chat wiht sockets
chatRoom(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(expressJwt({ secret: 'the real true secret' }).unless({ path: ['/', '/login', '/users'] }));
app.use(cookieParser());
// app.all('*', (req, res) => res.sendFile(path.resolve(__dirname, '../public/index.html')));


app.get('/roomInfo', (req, res) => {
  res.status(200).send('this is the protected room info');
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
