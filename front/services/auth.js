import $ from 'jquery';
import history from '../config/history';
import RoomService from './room';


const AuthService = {
  login(userData) {
    return $.post('login', userData)
      .done(() => {
        history.replace('/room');
      });
  },

  logout() {
    $.post('/logout').done(() => {
      RoomService.leaveTheRoom();
    }).fail(() => {
      alert('Could not disconnect. Something went wrong');
    });
  },
};

export default AuthService;
