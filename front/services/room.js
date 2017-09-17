import $ from 'jquery';
import { redirectToHome } from '../config/history';


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
        redirectToHome();
      }
    });
  },

  sendMessage(message) {
    this.socket.emit('chat message', message);
  },

  leaveTheRoom() {
    this.socket.disconnect(true);
    redirectToHome();
  },
};

export default RoomService;
