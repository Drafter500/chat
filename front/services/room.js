import $ from 'jquery';
import history from '../config/history';


const RoomService = {
  enterTheRoom(newMessageHandler, participantsUpdateHandler, prevMessagesHandler) {
    const room = this;
    $.get('/roomInfo').done(() => {
      room.socket = io();
      room.socket.on('message arrived', (answer) => {
        newMessageHandler(answer);
      });
      room.socket.on('participants updated', (participants, details) => {
        participantsUpdateHandler(participants, details);
      });
      room.socket.on('previous messages', (messages) => {
        prevMessagesHandler(messages);
      });
    })
    .fail((e) => {
      if (e.status === 401) {
        history.replace('/');
      }
    });
  },

  sendMessage(message) {
    this.socket.emit('chat message', message);
  },

  leaveTheRoom() {
    this.socket.disconnect(true);
    history.replace('/');
  },
};

export default RoomService;
