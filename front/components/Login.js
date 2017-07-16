import React from 'react';


class Login extends React.Component {

  handleLogin = () => {
    alert('login');
  }


  render() {
    return (
      <div className="enter-form">
        <div className="form-item"><span>Username: </span><input type="text" id="username" /></div>
        <div className="form-item"><span>Age: </span><input type="number" id="age" /></div>
        <div className="form-item">
            <span>Gender: </span>
            <select id="gender">
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
      </div>
    );
  }
}

export default Login;
