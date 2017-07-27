import $ from 'jquery';


const RoomService = {
  getRoomInfo() {
    $.get('roomInfo').done((result) => {
      console.log(result);
    });
  }
};

export default AuthService;
