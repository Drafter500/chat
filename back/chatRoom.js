import socketIo from 'socket.io';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from './constants';


export default function initializeChat(server) {
  const io = socketIo.listen(server);

  const participants = [];

  io.on('connection', (socket) => {
    const cookieParsed = cookie.parse(socket.request.headers.cookie);
    const credentials = jwt.decode(cookieParsed[TOKEN_KEY]);

    // TODO: process credentials, check if user exists, if not, add him to the list
    participants.push(credentials);
    io.emit('participants updated', participants);

    console.log('user connected');
    const user = credentials.username;
    socket.on('chat message', (msg) => {
      io.emit('message arrived', `${user}: ${msg}`);
    });
  });
}
