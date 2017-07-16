import React from 'react';
import $ from 'jquery';
import history from '../config/history';


class Login extends React.Component {

  handleLogin = (e) => {
    e.preventDefault();
    const data = {};
    $(this.form).serializeArray().forEach(item => data[item.name] = item.value);
    history.replace('/room');
  }


  render() {
    return (
      <form
        ref={(e) => this.form = e}
        className="enter-form"
      >
        <div className="form-item">
          <span>Username: </span>
          <input
            ref={(e) => this.username = e}
            type="text"
            name="username"
            />
        </div>
        <div className="form-item">
          <span>Age: </span>
          <input
            ref={(e) => this.age = e}
            type="number"
            name="age"
            />
        </div>
        <div className="form-item">
            <span>Gender: </span>
            <select
              ref={(e) => this.gender = e}
              name="gender"
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
          </div>
        <br />
        <div className="form-item">
          <button
            id="enter-button"
            onClick={this.handleLogin}
          >
            Enter the room
          </button>
        </div>
      </form>
    );
  }
}

export default Login;
