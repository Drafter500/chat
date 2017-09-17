import socketIo from 'socket.io';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from './constants';


export default function initializeChat(server) {
  const io = socketIo.listen(server);

  const participants = [];
  const messages = [];

  io.on('connection', (socket) => {
    const cookieParsed = cookie.parse(socket.request.headers.cookie);
    const credentials = jwt.decode(cookieParsed[TOKEN_KEY]);

    // TODO: process credentials, check if user exists, if not, add him to the list
    participants.push(credentials);

    socket.emit('previous messages', messages.slice(-5));
    io.emit('participants updated', participants, { credentials, event: 'connected' });

    const userName = credentials.username;
    socket.on('chat message', (message) => {
      const newMessage = {
        userName,
        message,
      };
      messages.push(newMessage);
      io.emit('message arrived', newMessage);
    });

    socket.on('disconnect', () => {
      const userIndex = participants.findIndex(p => p.username === credentials.username);
      if (userIndex >= 0) {
        participants.splice(userIndex, 1);
        io.emit('participants updated', participants, { credentials, event: 'disconnected' });
      }
    });
  });
}
