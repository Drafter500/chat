import React from 'react';
import $ from 'jquery';
import classnames from 'classnames';
import AuthService from '../../services/auth';


const MIN_AGE = 6;
const MAX_AGE = 99;

function getAges() {
  return Array(MAX_AGE + 1).fill().map((v, i) => i).slice(MIN_AGE);
}

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nameValid: true,
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    const data = {};
    $(this.form).serializeArray().forEach(item => data[item.name] = item.value);

    if (data.username) {
      AuthService.login(data);
    } else {
      this.setState({nameValid: false});
    }
  }

  onUserNameInputChange = () => {
    this.setState({nameValid: true});
  }

  render() {
    return (
      <form
        ref={(e) => this.form = e}
        className="enterForm"
      >
        <div className="enterForm-item">
          <span className="enterForm-item-label">Username: </span>
          <input
            ref={(e) => this.username = e}
            className={classnames("enterForm-item-input", { "enterForm-item-input--invalid" : !this.state.nameValid })}
            onChange={this.onUserNameInputChange}
            type="text"
            name="username"
          />
          {
            !this.state.nameValid &&
            <span className="enterForm-item-validationMessage">
              User name should be filled
            </span>
          }
        </div>
        <div className="enterForm-item">
          <span className="enterForm-item-label">Age: </span>
          <select
            ref={(e) => this.age = e}
            className="enterForm-item-input"
            type="number"
            name="age"
            required="true"
          >
            {getAges().map(age => (
              <option
                value={age}
                key={age}
              >
                {age}
              </option>
            ))}
          </select>
        </div>
        <div className="enterForm-item">
            <span className="enterForm-item-label">Gender: </span>
            <select
              ref={(e) => this.gender = e}
              className="enterForm-item-input"
              name="gender"
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
          </div>
        <br />
        <div className="enterForm-item">
          <button
            id="enter-button"
            className="enterForm-item-button"
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
