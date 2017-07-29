import $ from 'jquery';
import history from '../config/history';


const AuthService = {
  login(userData) {
    $.post('login', userData).done(() => {
      history.replace('/room');
    });
  },
};

export default AuthService;
