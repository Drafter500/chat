import socketIo from 'socket.io';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from './constants';

const PREVIOUS_MESSAGES_COUNT = 5;

class ChatRoom {
  constructor(server) {
    const io = socketIo.listen(server);
    this.participants = [];
    this.messages = [];

    io.on('connection', (socket) => {
      const cookieParsed = cookie.parse(socket.request.headers.cookie);
      const credentials = jwt.decode(cookieParsed[TOKEN_KEY]);

      this.participants.push(credentials);

      socket.emit('previous messages', this.messages.slice(-PREVIOUS_MESSAGES_COUNT));
      io.emit('participants updated', this.participants, { credentials, event: 'connected' });

      const userName = credentials.username;
      socket.on('chat message', (message) => {
        const newMessage = {
          userName,
          message,
        };
        this.messages.push(newMessage);
        io.emit('message arrived', newMessage);
      });

      socket.on('disconnect', () => {
        const userIndex = this.participants.findIndex(p => p.username === credentials.username);
        if (userIndex >= 0) {
          this.participants.splice(userIndex, 1);
          io.emit('participants updated', this.participants, { credentials, event: 'disconnected' });
        }
      });
    });
  }
}

export default ChatRoom;
