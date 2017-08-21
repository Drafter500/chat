import $ from 'jquery';
import history from '../config/history';


const RoomService = {
  enterTheRoom(newMessageHandler, participantsUpdateHandler) {
    $.get('/roomInfo').done(() => {
      this.socket = io();
      this.socket.on('message arrived', (answer) => {
        newMessageHandler(answer);
      });
      this.socket.on('participants updated', (participants) => {
        participantsUpdateHandler(participants);
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
};

export default RoomService;
