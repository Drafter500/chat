import $ from 'jquery';
import { resolveUrl } from '../config/config';


const AuthService = {
  login(userData) {
    $.post('login', userData).done(() => {
      alert('login success');
    });
  }
};

export default AuthService;
